require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

app.use(express.json());
app.use(cors());

//  Ensure MongoDB URI is available
if (!process.env.MONGO_URI) {
    console.error(" MongoDB URI is missing! Check your .env file.");
    process.exit(1);
}

//  Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log(" MongoDB Connected"))
.catch(err => console.log(" MongoDB Connection Error:", err));

//  User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    resetToken: String,
    resetTokenExpiry: Date
});
const User = mongoose.model("User", UserSchema);

//  User Signup (Register)
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "Email already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });

        await user.save();
        res.json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ error: "Error signing up" });
    }
});

//  User Login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid password" });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user: { name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

const path = require("path");

//  Serve static files from the current directory
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


//  Forgot Password (Generate Reset Link)
app.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ error: "User not found" });

        //  Generate a unique token (valid for 15 minutes)
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15m" });

        //  Store the token in the database
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
        await user.save();

        //  Send the reset link (Normally via email, for now, we return it)
        res.json({ message: `Click here to reset your password: http://localhost:5500/reset-password.html?token=${token}` });
    } catch (error) {
        res.status(500).json({ error: "Error sending reset link" });
    }
});

//  Reset Password (Verify Token & Update Password)
app.post("/reset-password", async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token) return res.status(400).json({ error: "Invalid or missing token." });

        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return res.status(400).json({ error: "Invalid or expired token." });
        }

        //  Find user with the stored token
        const user = await User.findOne({ _id: decoded.id, resetToken: token, resetTokenExpiry: { $gt: Date.now() } });

        if (!user) return res.status(400).json({ error: "Invalid or expired token." });

        //  Hash new password and save
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.json({ message: " Password reset successful! You can now login." });

    } catch (error) {
        res.status(500).json({ error: "Error resetting password." });
    }
});

//  Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
