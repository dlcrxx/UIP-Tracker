// Location Dropdown Implementation - START
const provinceSelect = document.getElementById('province');
const citySelect = document.getElementById('city');
const barangaySelect = document.getElementById('barangay');
let locationData = {}; // To hold the fetched location data

// Fetch and initialize location data
async function initializeLocationData() {
    try {
        const response = await fetch('locations.json');
        if (!response.ok) throw new Error('Failed to fetch locations');
        locationData = await response.json();
        populateProvinces();
        
        // After populating, load saved selections
        loadSavedSelections();
    } catch (error) {
        console.error('Error loading location data:', error);
        alert('Error loading location data. Please try refreshing the page.');
    }
}

function populateProvinces() {
    provinceSelect.innerHTML = '<option value="">-- Select Province --</option>';
    for (let province in locationData) {
        const option = document.createElement('option');
        option.value = province;
        option.textContent = province;
        provinceSelect.appendChild(option);
    }
}

function populateCities(selectedProvince) {
    citySelect.innerHTML = '<option value="">-- Select City/Municipality --</option>';
    barangaySelect.innerHTML = '<option value="">-- Select Barangay --</option>';
    barangaySelect.disabled = true;

    if (!selectedProvince) {
        citySelect.disabled = true;
        return;
    }

    citySelect.disabled = false;
    const cities = Object.keys(locationData[selectedProvince]);
    
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
}

function populateBarangays(selectedProvince, selectedCity) {
    barangaySelect.innerHTML = '<option value="">-- Select Barangay --</option>';

    if (!selectedCity) {
        barangaySelect.disabled = true;
        return;
    }

    barangaySelect.disabled = false;
    const barangays = locationData[selectedProvince][selectedCity]?.barangays || [];
    
    barangays.forEach(barangay => {
        const option = document.createElement('option');
        option.value = barangay;
        option.textContent = barangay;
        barangaySelect.appendChild(option);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeLocationData();
    
    // Street input validation setup
    setupStreetValidation();
});

// Location Dropdown Event Listeners
provinceSelect.addEventListener('change', function() {
    const selectedProvince = this.value;
    populateCities(selectedProvince);
    saveSelections();
});

citySelect.addEventListener('change', function() {
    const selectedProvince = provinceSelect.value;
    const selectedCity = this.value;
    populateBarangays(selectedProvince, selectedCity);
    saveSelections();
});

barangaySelect.addEventListener('change', function() {
    saveSelections();
});
// Location Dropdown Implementation - END

// Form Navigation and Validation - START
function saveSelections() {
    localStorage.setItem('province', provinceSelect.value);
    localStorage.setItem('city', citySelect.value);
    localStorage.setItem('barangay', barangaySelect.value);
    localStorage.setItem('street', document.getElementById('street').value);
}

function loadSavedSelections() {
    const savedProvince = localStorage.getItem('province');
    const savedCity = localStorage.getItem('city');
    const savedBarangay = localStorage.getItem('barangay');
    const savedStreet = localStorage.getItem('street');

    if (savedProvince) {
        provinceSelect.value = savedProvince;
        populateCities(savedProvince);
        
        // Need timeout to wait for city options to populate
        setTimeout(() => {
            if (savedCity) {
                citySelect.value = savedCity;
                populateBarangays(savedProvince, savedCity);
                
                // Another timeout for barangay options
                setTimeout(() => {
                    if (savedBarangay) {
                        barangaySelect.value = savedBarangay;
                    }
                }, 100);
            }
        }, 100);
    }
    
    if (savedStreet) {
        document.getElementById('street').value = savedStreet;
    }
}

function setupStreetValidation() {
    const streetInput = document.getElementById('street');
    const streetError = document.createElement('small');
    streetError.style.display = 'block';
    streetError.style.marginTop = '4px';
    streetError.style.fontSize = '12px';
    streetError.style.color = 'red';
    streetInput.parentNode.appendChild(streetError);

    streetInput.addEventListener('input', function() {
        const value = this.value.trim();
        const pattern = /^[A-Za-z0-9\s.,#-]{3,50}$/;

        if (!value) {
            streetError.textContent = 'Street name is required.';
            this.style.borderColor = 'red';
        } else if (!pattern.test(value)) {
            streetError.textContent = 'Only letters, numbers, spaces, and .,-# are allowed (3-50 characters).';
            this.style.borderColor = 'red';
        } else {
            streetError.textContent = '';
            this.style.borderColor = 'green';
            saveSelections();
        }
    });
}

// Navigation Buttons
document.getElementById('backBtn').addEventListener('click', function(e) {
    e.preventDefault();
    saveSelections();
    window.location.href = 'signup1.html';
});

document.getElementById('nextBtn').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Validate required fields
    if (!provinceSelect.value || !citySelect.value || !barangaySelect.value || !document.getElementById('street').value.trim()) {
        alert('Please complete all address fields before proceeding.');
        return;
    }

    saveSelections();
    window.location.href = 'signup3.html';
});

document.querySelector('.sign-in-btn').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = 'signin.html';
});
// Form Navigation and Validation - END
