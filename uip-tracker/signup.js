// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {

    // --- ELEMENT SELECTION ---
    const form = document.getElementById("applicationForm");
    const nextBtn = document.getElementById("nextBtn");
    const signInBtn = document.querySelector(".sign-in-btn");

    const appIdInput = form.querySelector('input[placeholder="Enter your Application ID"]');
    const firstNameInput = form.querySelector('input[placeholder="Enter your First Name"]');
    const middleInitialInput = form.querySelector('input[placeholder="Enter your Middle Initial"]');
    const lastNameInput = form.querySelector('input[placeholder="Enter your Last Name"]');
    
    // --- DATA HANDLING ---
    function saveInputValues() {
        const formData = {
            appId: appIdInput.value,
            firstName: firstNameInput.value,
            middleInitial: middleInitialInput.value,
            lastName: lastNameInput.value
        };
        localStorage.setItem('signupStep1Data', JSON.stringify(formData));
    }

    function loadInputValues() {
        const savedData = localStorage.getItem('signupStep1Data');
        if (savedData) {
            const formData = JSON.parse(savedData);
            appIdInput.value = formData.appId || '';
            firstNameInput.value = formData.firstName || '';
            middleInitialInput.value = formData.middleInitial || '';
            lastNameInput.value = formData.lastName || '';
        }
    }

    // --- VALIDATION LOGIC ---
    function validateAndGetErrorMessages() {
        const errors = [];
        
        // Clear all previous error highlights
        [appIdInput, firstNameInput, lastNameInput, middleInitialInput].forEach(input => {
            input.classList.remove('error');
        });

        // Application ID Validation
        if (appIdInput.value.trim() === '') {
            errors.push('Please enter your Application ID.');
            appIdInput.classList.add('error');
        } else if (!/^\d{1,6}$/.test(appIdInput.value)) {
            errors.push('Application ID must be 1 to 6 numbers only.');
            appIdInput.classList.add('error');
        }

        // First Name Validation
        if (firstNameInput.value.trim() === '') {
            errors.push('Please enter your First Name.');
            firstNameInput.classList.add('error');
        } else if (!/^[a-zA-Z\s'-]+$/.test(firstNameInput.value)) {
            errors.push('First Name contains invalid characters.');
            firstNameInput.classList.add('error');
        }

        // Last Name Validation
        if (lastNameInput.value.trim() === '') {
            errors.push('Please enter your Last Name.');
            lastNameInput.classList.add('error');
        } else if (!/^[a-zA-Z\s'-]+$/.test(lastNameInput.value)) {
            errors.push('Last Name contains invalid characters.');
            lastNameInput.classList.add('error');
        }
        
        // Middle Initial Validation (Optional field)
        if (middleInitialInput.value && !/^[a-zA-Z]{1,2}$/.test(middleInitialInput.value)) {
            errors.push('Middle Initial must be 1 or 2 letters only.');
            middleInitialInput.classList.add('error');
        }

        return errors;
    }

    // --- EVENT LISTENERS ---
    // ITO YUNG BAGONG CODE NA MAY FADE TRANSITION
    nextBtn.addEventListener("click", (event) => {
        event.preventDefault();
        
        const errorMessages = validateAndGetErrorMessages();
        
        if (errorMessages.length > 0) {
            alert(errorMessages.join('\n'));
        } else {
            // Kung walang error, gawin ang mga sumusunod:
            saveInputValues(); // 1. I-save muna ang data

            document.body.classList.add('fade-out'); // 2. Simulan ang fade-out

            setTimeout(() => { // 3. Maghintay ng 500ms bago mag-redirect
                window.location.href = "signup1.html"; // Palitan kung iba ang next page
            }, 500);
        }
    });

    signInBtn.addEventListener("click", (e) => {
        // 1. Pigilan ang default na pag-redirect agad
        e.preventDefault();

        // 2. Idagdag ang 'fade-out' class sa body para mag-umpisa ang animation
        document.body.classList.add('fade-out');

        // 3. Maghintay ng 500ms bago mag-redirect
        setTimeout(() => {
            window.location.href = "signin.html";
        }, 300);
    });

        // Add fade-in effect when the page loads
    window.addEventListener('load', () => {
        document.body.classList.add('fade-in-on-load');
    });

    // Add listeners to save data as the user types
    const allInputs = [appIdInput, firstNameInput, middleInitialInput, lastNameInput];
    allInputs.forEach(input => {
        input.addEventListener('input', () => {
            // Auto-format Application ID
            if (input.placeholder === "Enter your Application ID") {
                input.value = input.value.replace(/\D/g, '');
            }
            saveInputValues();
        });
    });

    // --- INITIALIZATION ---
    loadInputValues();
    console.log("Signup page script initialized for alert-based validation.");

});
