document.addEventListener("DOMContentLoaded", function () {
    checkLoginStatus();

    const loginBtn = document.getElementById("login-btn");
    if (loginBtn) {
        loginBtn.addEventListener("click", function () {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("username", "User"); 
            window.location.href = "index.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("login-btn");
    if (loginBtn) {
        loginBtn.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    }
});

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const loginBtn = document.getElementById("login-btn");
    const userGreeting = document.getElementById("user-greeting");
    const userName = document.getElementById("user-name");

    if (isLoggedIn === "true") {
        if (loginBtn) loginBtn.style.display = "none";
        if (userGreeting && userName) {
            userName.textContent = localStorage.getItem("username") || "User";
            userGreeting.style.display = "block";
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let agriDukanLink = document.querySelector('a[href="#agri-dukan"]');
    if (agriDukanLink) {
        agriDukanLink.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default scrolling behavior
            window.location.href = "dk.html"; // Redirect to dk.html
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const profileMenu = document.getElementById("profile-menu");
    const profileDashboard = document.getElementById("profile-dashboard");
    const closeDashboard = document.getElementById("close-dashboard");
    
    if (isLoggedIn === "true") {
        profileMenu.style.display = "block";
        document.getElementById("profile-name").textContent = localStorage.getItem("username") || "User";
        document.getElementById("profile-email").textContent = localStorage.getItem("email") || "Not Provided";
        document.getElementById("profile-bio").textContent = localStorage.getItem("bio") || "No bio available";
        document.getElementById("profile-interests").textContent = localStorage.getItem("interests") || "No interests added";
    } else {
        profileMenu.style.display = "none";
    }
    
    profileMenu.addEventListener("click", function () {
        profileDashboard.classList.add("show");
    });
    
    closeDashboard.addEventListener("click", function () {
        profileDashboard.classList.remove("show");
    });
});

    


document.addEventListener("DOMContentLoaded", function () {
    // Event listener for the "Upload" button
    document.getElementById('upload-blog-btn').addEventListener('click', function() {
        var blogTitle = document.getElementById('blog-title').value;
        var blogImg = document.getElementById('blog-img').files[0];

        // Check if blog title is entered
        if (blogTitle === "") {
            alert("Please enter a blog title.");
            return;
        }

        // Create a new list item for the uploaded blog
        var listItem = document.createElement('li');

        // Create a link for the blog title
        var blogLink = document.createElement('a');
        blogLink.textContent = blogTitle;
        blogLink.href = "blog.html?title=" + encodeURIComponent(blogTitle);  // Link to blog.html with the blog title as a query parameter
        blogLink.target = "_blank";  // Open the blog page in a new tab

        // Create an image element if an image is uploaded
        if (blogImg) {
            var imgElement = document.createElement('img');
            var reader = new FileReader();
            reader.onload = function(e) {
                imgElement.src = e.target.result;
                imgElement.alt = blogImg.name;
                imgElement.width = 100; // Set a width for the image
                imgElement.height = 100; // Set a height for the image
                listItem.appendChild(imgElement);  // Append image to the list item
            };
            reader.readAsDataURL(blogImg);
        }

        // Append the blog link to the list item
        listItem.appendChild(blogLink);

        // Append the new list item to the blog list
        document.getElementById('blog-list').appendChild(listItem);

        // Optionally, clear the input fields after the blog is added
        document.getElementById('blog-title').value = "";
        document.getElementById('blog-img').value = "";
    });
});


// Crop Diary
const cropDiaryBtn = document.getElementById('crop-diary-btn');
if (cropDiaryBtn) {
    cropDiaryBtn.addEventListener('click', function() {
        const content = document.getElementById('crop-diary-content');
        if (content) {
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        }
    });
}

// Scan Your Crop
const scanCropBtn = document.getElementById('scan-crop-btn');
if (scanCropBtn) {
    scanCropBtn.addEventListener('click', function() {
        const content = document.getElementById('scan-crop-content');
        if (content) {
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        }
    });
}

const scanBtn = document.getElementById('scan-btn');
if (scanBtn) {
    scanBtn.addEventListener('click', function() {
        const cropImage = document.getElementById('crop-scan-img').files[0];
        if (cropImage) {
            document.getElementById('scan-result').innerHTML = `<p>Scanning image: ${cropImage.name}... (This could be a mockup scan result)</p>`;
        } else {
            alert('Please upload a crop image.');
        }
    });
}

// Fertilizer Calculator
const fertilizerCalculatorBtn = document.getElementById('fertilizer-calculator-btn');
if (fertilizerCalculatorBtn) {
    fertilizerCalculatorBtn.addEventListener('click', function() {
        const content = document.getElementById('fertilizer-calculator-content');
        if (content) {
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        }
    });
}

const calculateFertilizerBtn = document.getElementById('calculate-fertilizer-btn');
if (calculateFertilizerBtn) {
    calculateFertilizerBtn.addEventListener('click', function() {
        const cropType = document.getElementById('crop-type').value;
        const fieldSize = document.getElementById('field-size').value;
        if (fieldSize && cropType) {
            const fertilizerAmount = fieldSize * 10; // Example formula
            document.getElementById('fertilizer-result').innerHTML = `Recommended fertilizer for ${cropType}: ${fertilizerAmount} kg.`;
        } else {
            alert('Please fill in both fields.');
        }
    });



// Cultivation Tips
const cultivationTipsBtn = document.getElementById('cultivation-tips-btn');
if (cultivationTipsBtn) {
    cultivationTipsBtn.addEventListener('click', function() {
        const content = document.getElementById('cultivation-tips-content');
        if (content) {
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        }

        const cropType = document.getElementById('crop-type').value;
        const tipsList = document.getElementById('cultivation-tips-list');
        if (tipsList) {
            tipsList.innerHTML = ''; // Clear previous tips

            const tips = {
                wheat: ['Water regularly during early growth.', 'Avoid over-fertilization.'],
                rice: ['Ensure proper drainage.', 'Use organic fertilizers for better growth.'],
                corn: ['Provide adequate spacing between plants.', 'Ensure sufficient sunlight.']
            };

            if (cropType && tips[cropType]) {
                tips[cropType].forEach(tip => {
                    const listItem = document.createElement('li');
                    listItem.textContent = tip;
                    tipsList.appendChild(listItem);
                });
            }
        }
    });
}

// Pests and Disease Alerts
const pestsDiseaseAlertsBtn = document.getElementById('pests-disease-alerts-btn');
if (pestsDiseaseAlertsBtn) {
    pestsDiseaseAlertsBtn.addEventListener('click', function() {
        const content = document.getElementById('pests-disease-alerts-content');
        if (content) {
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        }

        const alertsList = document.getElementById('alerts-list');
        if (alertsList) {
            alertsList.innerHTML = ''; // Clear previous alerts

            const alerts = [
                'Alert: Early blight detected in tomatoes. Apply fungicide.',
                'Alert: Aphids found in corn fields. Use appropriate insecticide.',
                'Alert: Downy mildew in wheat fields. Use resistant varieties.'
            ];

            alerts.forEach(alert => {
                const listItem = document.createElement('li');
                listItem.textContent = alert;
                alertsList.appendChild(listItem);
            });
        }
    });
    // Helpline Contact Button
const callHelpBtn = document.getElementById('call-help-btn');
if (callHelpBtn) {
    callHelpBtn.addEventListener('click', function() {
        const phoneNumber = 'tel:+18001234567'; // The helpline number
        // For mobile users, this will open the phone dialer
        window.location.href = phoneNumber;

        // If it's not a mobile device, we can show a message as a fallback
        // alert('For support, call our helpline at +1 (800) 123-4567');
    });
}
// Feedback Form Submission
document.getElementById('feedback-form')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const feedback = document.getElementById('feedback').value;

    // Basic validation to check if all fields are filled
    if (name && email && feedback) {
        // Simulate feedback submission process
        // Here, you can add logic to save or send the feedback, e.g., using an API.

        // Display confirmation message
        document.getElementById('feedback-result').innerHTML = `<p>Thank you for your feedback, ${name}! We appreciate your input.</p>`;

        // Optionally, clear the form after submission
        document.getElementById('feedback-form').reset();
    } else {
        // Show error message if any field is empty
        alert('Please fill in all fields before submitting the feedback.');
    }
});

}
}

