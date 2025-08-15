// Add fade-in effect when the page loads (300ms)
// Ito ay dapat laging nasa labas ng DOMContentLoaded.
window.addEventListener('load', () => {
    document.body.classList.add('fade-in-on-load');
});

// Main script na gagana kapag handa na ang HTML document
document.addEventListener('DOMContentLoaded', function() {
    // --- DOM ELEMENTS ---
    const provinceSelect = document.getElementById('province');
    const citySelect = document.getElementById('city');
    const barangaySelect = document.getElementById('barangay');
    const streetInput = document.getElementById('street');
    const backBtn = document.getElementById('backBtn');
    const nextBtn = document.getElementById('nextBtn');
    const signInBtn = document.querySelector('.sign-in-btn');

    let locationData = {}; // Para sa fetched location data

    // --- INITIALIZATION ---
    async function initializeForm() {
        try {
            const response = await fetch('locations.json');
            if (!response.ok) throw new Error('Failed to fetch locations.json');
            locationData = await response.json();
            
            populateProvinces();
            loadSavedAddress();
            setupStreetValidation();

        } catch (error) {
            console.error('Error initializing form:', error);
            alert('Could not load address information. Please refresh the page.');
        }
    }

    // --- LOCATION LOGIC ---
    function populateProvinces() {
        const provinces = Object.keys(locationData);
        provinceSelect.innerHTML = '<option value="">-- Select Province --</option>';
        provinces.forEach(province => {
            const option = document.createElement('option');
            option.value = province;
            option.textContent = province;
            provinceSelect.appendChild(option);
        });
    }

    function populateCities(selectedProvince) {
        citySelect.innerHTML = '<option value="">-- Select City/Municipality --</option>';
        barangaySelect.innerHTML = '<option value="">-- Select Barangay --</option>';
        
        if (selectedProvince && locationData[selectedProvince]) {
            const cities = Object.keys(locationData[selectedProvince]);
            cities.forEach(city => {
                const option = new Option(city, city);
                citySelect.appendChild(option);
            });
            citySelect.disabled = false;
        } else {
            citySelect.disabled = true;
        }
        barangaySelect.disabled = true;
        updatePlaceholderStyles();
    }

    function populateBarangays(selectedProvince, selectedCity) {
        barangaySelect.innerHTML = '<option value="">-- Select Barangay --</option>';
        
        if (selectedProvince && selectedCity && locationData[selectedProvince]?.[selectedCity]?.barangays) {
            const barangays = locationData[selectedProvince][selectedCity].barangays;
            barangays.forEach(barangay => {
                const option = new Option(barangay, barangay);
                barangaySelect.appendChild(option);
            });
            barangaySelect.disabled = false;
        } else {
            barangaySelect.disabled = true;
        }
        updatePlaceholderStyles();
    }

    // --- DATA PERSISTENCE ---
    function saveAddress() {
        localStorage.setItem('province', provinceSelect.value);
        localStorage.setItem('city', citySelect.value);
        localStorage.setItem('barangay', barangaySelect.value);
        localStorage.setItem('street', streetInput.value);
    }

    function loadSavedAddress() {
        const savedProvince = localStorage.getItem('province');
        const savedCity = localStorage.getItem('city');
        const savedBarangay = localStorage.getItem('barangay');
        const savedStreet = localStorage.getItem('street');

        if (savedStreet) streetInput.value = savedStreet;

        if (savedProvince) {
            provinceSelect.value = savedProvince;
            populateCities(savedProvince);
            if (savedCity) {
                citySelect.value = savedCity;
                populateBarangays(savedProvince, savedCity);
                if (savedBarangay) {
                    barangaySelect.value = savedBarangay;
                }
            }
        }
        updatePlaceholderStyles();
    }

    // --- UI & VALIDATION ---
    function updatePlaceholderStyles() {
        [provinceSelect, citySelect, barangaySelect].forEach(select => {
            select.classList.toggle('placeholder', select.value === "");
        });
    }

    function setupStreetValidation() {
        const errorContainer = document.createElement('div');
        streetInput.closest('.input-group').appendChild(errorContainer);
        const streetError = document.createElement('small');
        streetError.className = 'street-error';
        errorContainer.appendChild(streetError);

        streetInput.addEventListener('input', function() {
            const value = this.value;
            const pattern = /^[A-Za-z0-9\s.,#-]+$/;
            if (value.trim() === '') {
                streetError.textContent = 'Street name is required.';
                this.style.borderColor = 'red';
            } else if (value.length < 3 || value.length > 50 || !pattern.test(value)) {
                streetError.textContent = 'Invalid format (3-50 chars).';
                this.style.borderColor = 'red';
            } else {
                streetError.textContent = '';
                this.style.borderColor = '#014080';
                saveAddress();
            }
        });
    }

    function isFormValid() {
        const isStreetValid = streetInput.value.trim() !== '' && streetInput.style.borderColor !== 'red';
        if (!provinceSelect.value || !citySelect.value || !barangaySelect.value || !isStreetValid) {
            alert('Please complete all address fields correctly before proceeding.');
            return false;
        }
        return true;
    }

    // --- EVENT LISTENERS WITH FADE TRANSITION (300ms) ---

    provinceSelect.addEventListener('change', function() {
        populateCities(this.value);
        saveAddress();
    });

    citySelect.addEventListener('change', function() {
        populateBarangays(provinceSelect.value, this.value);
        saveAddress();
    });

    barangaySelect.addEventListener('change', saveAddress);

    // UPDATED with 300ms fade transition
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        saveAddress();
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = 'signup1.html';
        }, 300);
    });

    // UPDATED with 300ms fade transition
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (isFormValid()) {
            saveAddress();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'signup3.html';
            }, 300);
        }
    });
    
    // UPDATED with 300ms fade transition
    signInBtn.addEventListener('click', (e) => {
       e.preventDefault();
       document.body.classList.add('fade-out');
       setTimeout(() => {
           window.location.href = 'signin.html';
       }, 300);
    });

    initializeForm();
});