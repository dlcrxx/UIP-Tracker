// Add fade-in effect when the page loads.
// Dapat laging nasa labas ito ng DOMContentLoaded.
window.addEventListener('load', () => {
    document.body.classList.add('fade-in-on-load');
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // --- ELEMENT SELECTION ---
    const startDateInput = document.getElementById("startDate");
    const endDateInput = document.getElementById("endDate");
    const startShiftSelect = document.getElementById("startShift");
    const endShiftInput = document.getElementById("endShift");
    const nextBtn = document.getElementById("nextBtn");
    const backBtn = document.getElementById("backBtn");
    const signInBtn = document.querySelector(".sign-in-btn"); // Idinagdag para maging kumpleto

    // --- DATA HANDLING ---
    function saveInputValues() {
        localStorage.setItem('step4_startDate', startDateInput.value);
        localStorage.setItem('step4_endDate', endDateInput.value);
        localStorage.setItem('step4_startShift', startShiftSelect.value);
        localStorage.setItem('step4_endShift', endShiftInput.value);
    }

    function loadInputValues() {
        const savedStartDate = localStorage.getItem('step4_startDate');
        if (savedStartDate) startDateInput.value = savedStartDate;

        const savedEndDate = localStorage.getItem('step4_endDate');
        if (savedEndDate) endDateInput.value = savedEndDate;

        const savedStartShift = localStorage.getItem('step4_startShift');
        if (savedStartShift) {
            startShiftSelect.value = savedStartShift;
            updateEndShift(savedStartShift);
        }
        
        updateSelectPlaceholder();
    }

    // --- UI FUNCTIONS ---
    function updateEndShift(startTime) {
        let endTimeValue = '';
        switch(startTime) {
            case '08:00': endTimeValue = '5:00 PM'; break;
            case '09:00': endTimeValue = '6:00 PM'; break;
            case '15:00': endTimeValue = '12:00 AM'; break;
        }
        endShiftInput.value = endTimeValue;
    }

    function updateSelectPlaceholder() {
        if (startShiftSelect.value === "") {
            startShiftSelect.classList.add('placeholder');
        } else {
            startShiftSelect.classList.remove('placeholder');
        }
    }

    // --- VALIDATION LOGIC ---
    function validateAndShowAlert() {
        const errors = [];
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

        if (!startDateInput.value) {
            errors.push("Please select a start date.");
            startDateInput.classList.add('error');
        }
        if (!endDateInput.value) {
            errors.push("Please select an end date.");
            endDateInput.classList.add('error');
        }
        if (!startShiftSelect.value) {
            errors.push("Please select a start shift.");
            startShiftSelect.classList.add('error');
        }
        if (startDateInput.value && endDateInput.value && new Date(startDateInput.value) > new Date(endDateInput.value)) {
            errors.push("End date must be after the start date.");
            startDateInput.classList.add('error');
            endDateInput.classList.add('error');
        }

        if (errors.length > 0) {
            alert(errors.join('\n'));
            return false;
        }
        return true;
    }

    // --- EVENT LISTENERS with 300ms FADE TRANSITION ---
    
    // UPDATED with 300ms fade transition
    nextBtn.addEventListener("click", function (event) {
        event.preventDefault();
        if (validateAndShowAlert()) {
            saveInputValues();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = "signup4.html";
            }, 300);
        }
    });

    // UPDATED with 300ms fade transition
    backBtn.addEventListener("click", function (event) {
        event.preventDefault();
        saveInputValues();
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = "signup2.html";
        }, 300);
    });

    // UPDATED with 300ms fade transition (assuming signInBtn exists)
    if (signInBtn) {
        signInBtn.addEventListener("click", (e) => {
            e.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = "signin.html";
            }, 300);
        });
    }

    // Listener for saving data on change
    const formInputs = [startDateInput, endDateInput, startShiftSelect];
    formInputs.forEach(input => {
        input.addEventListener('change', () => {
            if(input.id === 'startShift'){
                updateEndShift(input.value);
                updateSelectPlaceholder();
            }
            saveInputValues();
        });
    });

    // --- INITIALIZATION ---
    loadInputValues();
    console.log("signup3.js loaded successfully with transitions.");
});