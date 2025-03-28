const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
const container = document.getElementById("container");

// Toggle between Sign Up and Sign In forms
registerBtn.addEventListener("click", () => {
    container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
});

// Handle form submissions
document.addEventListener("DOMContentLoaded", () => {
    const signUpForm = document.querySelector(".sign-up form");
    const signInForm = document.querySelector(".sign-in form");

    // Sign Up Form Submission (Register)
    signUpForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = signUpForm.querySelector("input[placeholder='Name']").value;
        const email = signUpForm.querySelector("input[placeholder='Email']").value;
        const password = signUpForm.querySelector("input[placeholder='Password']").value;

        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Registration successful! Please login.");
                container.classList.remove("active"); // Switch to login form
            } else {
                alert(data.error || "Signup failed. Try again.");
            }
        } catch (error) {
            alert("Error: Unable to connect to the server.");
        }
    });

    // Sign In Form Submission (Login)
    signInForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = signInForm.querySelector("input[placeholder='Email']").value;
        const password = signInForm.querySelector("input[placeholder='Password']").value;

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                alert("Login Successful!");
                window.location.href = "home.html";
            } else {
                alert(data.error || "Login failed. Try again.");
            }
        } catch (error) {
            alert("Error: Unable to connect to the server.");
        }
    });
});
