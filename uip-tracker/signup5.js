// Add fade-in effect when the page loads (300ms).
// Ito ay dapat laging nasa labas ng DOMContentLoaded.
window.addEventListener('load', () => {
    document.body.classList.add('fade-in-on-load');
});

document.addEventListener('DOMContentLoaded', function() {
    
    // --- DOM ELEMENTS ---
    const companySelect = document.getElementById('company');
    const pictureInput = document.getElementById('picture');
    const fileNameDisplay = document.getElementById('file-name-display');
    const clearFileBtn = document.getElementById('clear-file-btn');
    const nextBtn = document.getElementById('nextBtn');
    const backBtn = document.getElementById('backBtn');
    const signInBtn = document.querySelector(".sign-in-btn"); // Idinagdag para maging kumpleto
    const successPopup = document.getElementById('success-popup');
    const closePopupBtn = document.getElementById('close-popup-btn');
    
    const storageKey = 'signupStep5Data';

    // --- DATA HANDLING ---
    function saveInputValues() {
        let currentData = getStoredData();
        currentData.company = companySelect.value;
        localStorage.setItem(storageKey, JSON.stringify(currentData));
    }
    
    function saveFileToStorage(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            let currentData = getStoredData();
            currentData.pictureName = file.name;
            currentData.pictureData = e.target.result; // Base64 string
            localStorage.setItem(storageKey, JSON.stringify(currentData));
            updateFileInfo(file.name);
        };
        reader.readAsDataURL(file);
    }
    
    function loadInputValues() {
        const data = getStoredData();
        if (data.company) {
            companySelect.value = data.company;
        }
        updateFileInfo(data.pictureName);
        updateCompanyPlaceholder();
    }
    
    function getStoredData() {
        const savedData = localStorage.getItem(storageKey);
        return savedData ? JSON.parse(savedData) : { company: '', pictureName: null, pictureData: null };
    }
    
    function clearStoredPicture() {
        let data = getStoredData();
        data.pictureName = null;
        data.pictureData = null;
        localStorage.setItem(storageKey, JSON.stringify(data));
        updateFileInfo(null);
        pictureInput.value = '';
    }

    // --- UI UPDATES & POPUP HANDLING ---
    function showSuccessPopup() {
        if (successPopup) successPopup.style.display = 'flex';
    }

    function hideSuccessPopup() {
        if (successPopup) successPopup.style.display = 'none';
    }

    function updateCompanyPlaceholder() {
        companySelect.classList.toggle('placeholder', companySelect.value === "");
    }

    function updateFileInfo(fileName) {
        if (fileName) {
            fileNameDisplay.textContent = `Selected: ${fileName}`;
            clearFileBtn.style.display = 'inline-block';
        } else {
            fileNameDisplay.textContent = '';
            clearFileBtn.style.display = 'none';
        }
    }

    // --- VALIDATION ---
    function validateForm() {
        const storedData = getStoredData();
        let errorMessages = [];
        if (companySelect.value === "") errorMessages.push("Please select a company.");
        if (!storedData.pictureData) errorMessages.push("Please upload a 2x2 picture.");
        
        if (errorMessages.length > 0) {
            alert(errorMessages.join('\n'));
            return false;
        }
        return true;
    }

    // --- EVENT LISTENERS ---

    // NEXT button shows a popup, so it DOES NOT need a transition.
    if (nextBtn) {
        nextBtn.addEventListener("click", function(event) {
            event.preventDefault();
            if (validateForm()) {
                console.log("Validation successful. Submitting...");
                showSuccessPopup(); 
                // Clear all previous steps data after final submission
                for (let i = 1; i <= 5; i++) {
                    localStorage.removeItem(`signupStep${i}Data`);
                }
                localStorage.removeItem('signupStep1Data'); // remove old key just in case
                console.log("All signup data cleared from storage.");
            }
        });
    }

    // UPDATED BACK button with 300ms fade transition
    if (backBtn) {
        backBtn.addEventListener("click", function(event) {
            event.preventDefault(); // Added for consistency
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = "signup4.html";
            }, 300);
        });
    }

    // UPDATED SIGN IN button with 300ms fade transition
    if (signInBtn) {
        signInBtn.addEventListener("click", (e) => {
            e.preventDefault();
            document.body.classList.add('fade-in');
            setTimeout(() => {
                window.location.href = "signin.html";
            }, 300);
        });
    }

    if (closePopupBtn) {
        closePopupBtn.addEventListener("click", function() {
            hideSuccessPopup();
            // Optional: You can add a fade transition here too if you want to redirect to signin.html
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'signin.html';
            }, 300);
        });
    }

    companySelect.addEventListener('change', () => {
        updateCompanyPlaceholder();
        saveInputValues();
    });

    pictureInput.addEventListener('change', () => {
        const file = pictureInput.files[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png'];
            if (!allowedTypes.includes(file.type)) {
                alert("Invalid file type. Please select a PNG or JPG file.");
                clearStoredPicture();
                return;
            }
            saveFileToStorage(file);
        }
    });

    clearFileBtn.addEventListener('click', clearStoredPicture);

    // --- INITIALIZATION ---
    loadInputValues();
    console.log("Signup step 5 script ready.");
});