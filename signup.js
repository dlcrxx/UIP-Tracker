const steps = document.querySelectorAll(".form-step");
const indicators = document.querySelectorAll(".step");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const signInBtn = document.querySelector(".sign-in-btn"); // Select the Sign In button

let currentStep = 0;

// Function to save input values to local storage
function saveInputValues() {
    const inputs = steps[currentStep].querySelectorAll("input");
    inputs.forEach(input => {
        localStorage.setItem(input.placeholder, input.value); // Use placeholder as key
    });
}

// Function to load input values from local storage
function loadInputValues() {
    const inputs = steps[currentStep].querySelectorAll("input");
    inputs.forEach(input => {
        input.value = localStorage.getItem(input.placeholder) || ""; // Set value from local storage
    });
}

// Load input values when the page loads
window.onload = () => {
    loadInputValues();
    // Populate input values for the current step
    populateInputValues();
};

// Function to populate input values for the current step
function populateInputValues() {
    const inputs = steps[currentStep].querySelectorAll("input");
    inputs.forEach(input => {
        if (localStorage.getItem(input.placeholder)) {
            input.value = localStorage.getItem(input.placeholder); // Set value from local storage
        }
    });
}

nextBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default form submission

    // Save current step input values
    saveInputValues();

    // Move to the next step
    steps[currentStep].classList.remove("active");
    indicators[currentStep].classList.remove("active");

    currentStep++;
    if (currentStep >= steps.length) {
        // Redirect to signup1.html when reaching the last step
        window.location.href = "signup1.html";
        return; // Exit the function after redirection
    }

    steps[currentStep].classList.add("active");
    indicators[currentStep].classList.add("active");

    // Populate input values for the new step
    populateInputValues();
});

// BACK button click to go to the previous step
if (backBtn) {
    backBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default form submission

        // Save current step input values
        saveInputValues();

        // Move to the previous step
        steps[currentStep].classList.remove("active");
        indicators[currentStep].classList.remove("active");

        currentStep--;
        if (currentStep < 0) {
            // Redirect to signup.html if going back from the first step
            window.location.href = "signup.html";
            return; // Exit the function after redirection
        }

        steps[currentStep].classList.add("active");
        indicators[currentStep].classList.add("active");

        // Populate input values for the new step
        populateInputValues();
    });
}

// Sign In button click to redirect to signin.html
signInBtn.addEventListener("click", () => {
    window.location.href = "signin.html"; // Redirect to signin.html
});

// Application ID: numeric only, max 6 digits
document.querySelector('input[placeholder="Enter your Application ID"]').addEventListener("input", function(e) {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    e.target.value = value.slice(0, 6); // Limit max to 6 digits
});

// First Name & Last Name: letters, spaces, apostrophes, hyphens only, max 50 chars
function validateNameInput(e) {
    const char = String.fromCharCode(e.which); // Get the character being typed
    const regex = /^[a-zA-Z\s'-]$/; // Allow letters, spaces, apostrophes, and hyphens

    if (!regex.test(char)) {
        e.preventDefault(); // Prevent the character from being typed
    }
}

const firstNameInput = document.querySelector('input[placeholder="Enter your First Name"]');
const lastNameInput = document.querySelector('input[placeholder="Enter your Last Name"]');

firstNameInput.addEventListener('keypress', validateNameInput);
lastNameInput.addEventListener('keypress', validateNameInput);

// Middle Initial: letters only, max 1 char
const middleInitialInput = document.querySelector('input[placeholder="Enter your Middle Initial"]');
middleInitialInput.addEventListener('keypress', function(e) {
    const char = String.fromCharCode(e.which); // Get the character being typed
    const regex = /^[a-zA-Z]$/; // Allow only letters

    if (!regex.test(char)) {
        e.preventDefault(); // Prevent the character from being typed
    }
});
