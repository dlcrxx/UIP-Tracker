// Add fade-in effect when the page loads (300ms).
// Ito ay dapat laging nasa labas ng DOMContentLoaded.
window.addEventListener('load', () => {
    document.body.classList.add('fade-in-on-load');
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // --- ELEMENT SELECTION ---
    const dutyScheduleSelect = document.getElementById("dutySchedule");
    const universityInput = document.getElementById("university");
    const requiredHoursInput = document.getElementById("requiredHours");
    const gdriveLinkInput = document.getElementById("gdriveLink");
    const nextBtn = document.getElementById("nextBtn");
    const backBtn = document.getElementById("backBtn");
    const signInBtn = document.querySelector(".sign-in-btn"); // Idinagdag para maging kumpleto

    // --- DATA HANDLING ---
    function saveInputValues() {
        const formData = {
            dutySchedule: dutyScheduleSelect.value,
            university: universityInput.value,
            requiredHours: requiredHoursInput.value,
            gdriveLink: gdriveLinkInput.value
        };
        localStorage.setItem('signupStep4Data', JSON.stringify(formData));
    }

    function loadInputValues() {
        const savedData = localStorage.getItem('signupStep4Data');
        if (savedData) {
            const formData = JSON.parse(savedData);
            dutyScheduleSelect.value = formData.dutySchedule || '';
            universityInput.value = formData.university || '';
            requiredHoursInput.value = formData.requiredHours || '';
            gdriveLinkInput.value = formData.gdriveLink || '';
        }
    }

    // --- VALIDATION LOGIC ---
    function validateForm() {
        const gdrivePattern = /^(https?:\/\/)?(drive\.google\.com|docs\.google\.com)\/.*$/;
        let errorMessages = [];

        if (!dutyScheduleSelect.value) {
            errorMessages.push("Please select your duty schedule.");
        }
        if (!universityInput.value.trim()) {
            errorMessages.push("Please enter your university name.");
        }
        if (!requiredHoursInput.value.trim()) {
            errorMessages.push("Please enter the required internship hours.");
        }
        if (!gdriveLinkInput.value.trim()) {
            errorMessages.push("Please enter your Google Drive link.");
        } else if (!gdrivePattern.test(gdriveLinkInput.value)) {
            errorMessages.push("Please enter a valid Google Drive link.");
        }

        if (errorMessages.length > 0) {
            alert(errorMessages.join("\n"));
            return false;
        }
        return true;
    }

    // --- UI FUNCTIONS ---
    function updatePlaceholder() {
        if (dutyScheduleSelect.value) {
            dutyScheduleSelect.classList.remove('placeholder');
        } else {
            dutyScheduleSelect.classList.add('placeholder');
        }
    }

    // --- EVENT LISTENERS with 300ms FADE TRANSITION ---

    // UPDATED NEXT button with 300ms fade transition
    if (nextBtn) {
        nextBtn.addEventListener("click", function(event) {
            event.preventDefault();
            if (validateForm()) {
                saveInputValues();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = "signup5.html";
                }, 300);
            }
        });
    }

    // UPDATED BACK button with 300ms fade transition
    if (backBtn) {
        backBtn.addEventListener("click", function(event) {
            event.preventDefault();
            saveInputValues();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = "signup3.html";
            }, 300);
        });
    }

    // UPDATED SIGN IN button with 300ms fade transition
    if (signInBtn) {
        signInBtn.addEventListener("click", (e) => {
            e.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = "signin.html";
            }, 300);
        });
    }

    // Auto-save form data on input changes
    const formInputs = [dutyScheduleSelect, universityInput, requiredHoursInput, gdriveLinkInput];
    formInputs.forEach(input => {
        input.addEventListener('input', saveInputValues);
    });

    // Listener for duty schedule placeholder
    if (dutyScheduleSelect) {
        dutyScheduleSelect.addEventListener('change', updatePlaceholder);
    }
    
    // --- INITIALIZATION ---
    loadInputValues();
    updatePlaceholder(); // Set initial placeholder state
    console.log("signup4.js loaded successfully with transitions.");
});