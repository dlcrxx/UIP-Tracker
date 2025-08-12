// Mobile input formatting and number-only validation
document.getElementById("mobile").addEventListener("input", function(e) {
    // Remove non-digit characters
    let value = e.target.value.replace(/\D/g, "");
    
    // Limit to max 11 digits
    value = value.slice(0, 11);

    // Auto-format as 09XX-XXX-XXXX
    if (value.length > 4 && value.length <= 7) {
        value = value.slice(0, 4) + "-" + value.slice(4);
    } else if (value.length > 7) {
        value = value.slice(0, 4) + "-" + value.slice(4, 7) + "-" + value.slice(7);
    }

    e.target.value = value;
});

// Function to save input values to local storage
function saveInputValues() {
    const emailInput = document.getElementById("email");
    const mobileInput = document.getElementById("mobile");
    const birthdayInput = document.querySelector('input[type="date"]');
    
    localStorage.setItem("email", emailInput.value);
    localStorage.setItem("mobile", mobileInput.value);
    localStorage.setItem("birthday", birthdayInput.value);
}

// Function to load input values from local storage
function loadInputValues() {
    const emailInput = document.getElementById("email");
    const mobileInput = document.getElementById("mobile");
    const birthdayInput = document.querySelector('input[type="date"]');
    
    emailInput.value = localStorage.getItem("email") || "";
    mobileInput.value = localStorage.getItem("mobile") || "";
    birthdayInput.value = localStorage.getItem("birthday") || "";
}

// Load input values when the page loads
window.onload = loadInputValues;

// Function to validate email and toggle Next button
function validateEmail() {
    const emailInput = document.getElementById("email");
    const emailValue = emailInput.value.trim();
    
    // Strict regex pattern requiring @gmail.com domain
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const nextBtn = document.getElementById("nextBtn");

    if (emailPattern.test(emailValue)) {
        nextBtn.disabled = false;
        emailInput.style.borderColor = "green";
    } else {
        nextBtn.disabled = true;
        emailInput.style.borderColor = emailValue.length > 0 ? "red" : "#ccc";
    }
}

// Add event listener to email input for real-time validation
document.getElementById("email").addEventListener("input", validateEmail);

// NEXT button click handler
document.getElementById("nextBtn").addEventListener("click", function (event) {
    event.preventDefault();
    const emailInput = document.getElementById("email");
    const emailValue = emailInput.value.trim();
    
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(emailValue)) {
        alert("Please enter a valid Gmail address (must end with @gmail.com).");
        emailInput.focus();
        return;
    }

    saveInputValues();
    window.location.href = "signup2.html";
});

// BACK button click handler
document.getElementById("backBtn").addEventListener("click", function (event) {
    event.preventDefault();
    saveInputValues();
    window.location.href = "signup.html";
});

// Sign In button click handler
document.querySelector(".sign-in-btn").addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "signin.html";
});
