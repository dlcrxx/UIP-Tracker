// Add fade-in effect when the page loads
// Dapat laging nasa labas ito ng DOMContentLoaded para gumana nang tama.
window.addEventListener('load', () => {
    document.body.classList.add('fade-in-on-load');
});

// Main script na gagana kapag ready na ang buong HTML page
document.addEventListener("DOMContentLoaded", function() {

    // --- ELEMENT SELECTION ---
    const emailInput = document.getElementById("email");
    const mobileInput = document.getElementById("mobile");
    const birthdayInput = document.querySelector('input[type="date"]');
    const nextBtn = document.getElementById("nextBtn");
    const backBtn = document.getElementById("backBtn");
    const signInBtn = document.querySelector(".sign-in-btn");

    // --- DATA HANDLING ---
    function saveInputValues() {
        localStorage.setItem("email", emailInput.value);
        localStorage.setItem("mobile", mobileInput.value);
        localStorage.setItem("birthday", birthdayInput.value);
    }

    function loadInputValues() {
        emailInput.value = localStorage.getItem("email") || "";
        mobileInput.value = localStorage.getItem("mobile") || "";
        birthdayInput.value = localStorage.getItem("birthday") || "";
    }

    // --- VALIDATION LOGIC ---
    function validateAndGetErrorMessages() {
        const errors = [];
        const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        [emailInput, mobileInput, birthdayInput].forEach(input => {
            input.classList.remove('error');
        });

        if (emailInput.value.trim() === '') {
            errors.push('Please enter your email address.');
            emailInput.classList.add('error');
        } else if (!emailPattern.test(emailInput.value)) {
            errors.push('Please enter a valid email address (e.g., example@gmail.com).');
            emailInput.classList.add('error');
        }

        if (mobileInput.value.trim() === '') {
            errors.push('Please enter your mobile number.');
            mobileInput.classList.add('error');
        } else if (mobileInput.value.length !== 13) {
            errors.push('Please complete your mobile number (09XX-XXX-XXXX).');
            mobileInput.classList.add('error');
        }

        if (birthdayInput.value === '') {
            errors.push('Please select your birthday.');
            birthdayInput.classList.add('error');
        }

        return errors;
    }

    // --- EVENT LISTENERS ---

    // Mobile input auto-formatting
    mobileInput.addEventListener("input", function(e) {
        let value = e.target.value.replace(/\D/g, "").slice(0, 11);
        if (value.length > 4 && value.length <= 7) {
            value = value.slice(0, 4) + "-" + value.slice(4);
        } else if (value.length > 7) {
            value = value.slice(0, 4) + "-" + value.slice(4, 7) + "-" + value.slice(7);
        }
        e.target.value = value;
    });

    // === UPDATED NEXT button click handler with FADE TRANSITION ===
    nextBtn.addEventListener("click", function (event) {
        event.preventDefault();
        const errorMessages = validateAndGetErrorMessages();
        
        if (errorMessages.length > 0) {
            alert(errorMessages.join('\n'));
        } else {
            saveInputValues();
            document.body.classList.add('fade-out'); // Corrected from fade-in to fade-out
            setTimeout(() => {
                window.location.href = "signup2.html";
            }, 500);
        }
    });

    // === UPDATED BACK button click handler with FADE TRANSITION ===
    backBtn.addEventListener("click", function (event) {
        event.preventDefault();
        saveInputValues(); // I-save pa rin ang data bago bumalik
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = "signup.html"; // Balik sa unang step
        }, 500);
    });

    // === UPDATED Sign In button click handler with FADE TRANSITION ===
    signInBtn.addEventListener("click", function(event) {
        event.preventDefault();
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = "signin.html";
        }, 300);
    });
    
    // Save data in real-time as user types
    [emailInput, mobileInput, birthdayInput].forEach(input => {
        input.addEventListener('input', saveInputValues);
    });

    // --- INITIALIZATION ---
    loadInputValues();
    console.log("Signup Step 1 (or 2) script initialized correctly with transitions.");
});