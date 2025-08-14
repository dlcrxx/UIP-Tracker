
 // --- Get all the necessary HTML elements ---
            const loginForm = document.getElementById('loginForm');
            const signUpBtn = document.querySelector('.sign-up-btn');
            const togglePassword = document.getElementById('togglePassword');
            const passwordInput = document.getElementById('password');
            const checkStatusBtn = document.querySelector('.check-status-btn');
            const statusPopup = document.getElementById('statusPopup');
            const closePopupBtn = document.getElementById('closePopup');
            const submitStatusBtn = document.getElementById('submitStatus');

    // --- MAIN LOGIN LOGIC ---
  if (loginForm) {
                loginForm.addEventListener('submit', async (e) => {
                    e.preventDefault();

                    const email = document.getElementById('email').value;
                    const password = passwordInput.value;
                    const errorMessageElem = document.getElementById('errorMessage');

                    errorMessageElem.textContent = '';
                    errorMessageElem.style.display = 'none';

                    if (!email || !password) {
                        alert('Please enter both email and password.');
                        return;
                    }

                    try {
                        const response = await fetch('api_login.php', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email, password })
                        });
                        const data = await response.json();

                        if (response.ok) {
                            localStorage.setItem('loggedInUser', JSON.stringify(data.user));
                            if (data.token) localStorage.setItem('token', data.token);
                            
                            // Corrected redirect logic
                            if (data.user.role === 'admin' || data.user.role === 'staff') {
                                window.location.href = 'admin-dashboard.html';
                            } else {
                                window.location.href = 'user-dashboard.html';
                            }
                        } else {
                            errorMessageElem.textContent = data.message || 'Login failed.';
                            errorMessageElem.style.display = 'block';
                        }
                    } catch (error) {
                        console.error('Login error:', error);
                        errorMessageElem.textContent = 'An error occurred. Please try again.';
                        errorMessageElem.style.display = 'block';
                    }
                });
            }

    // --- UI EVENT LISTENERS ---

    // Redirect to signup.html when Sign Up button is clicked
    if (signUpBtn) {
        signUpBtn.addEventListener('click', () => {
            window.location.href = 'signup.html';
        });
    }

    // Toggle password visibility on sign-in form
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            // This assumes you have Font Awesome CSS for the eye icon
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }

    // Show popup when "Check Status" button is clicked
    if (checkStatusBtn && statusPopup) {
        checkStatusBtn.addEventListener('click', () => {
            statusPopup.style.display = 'flex';
            document.getElementById('statusEmail').value = '';
        });
    }

    // Close popup when close button (X) is clicked
    if (closePopupBtn && statusPopup) {
        closePopupBtn.addEventListener('click', () => {
            statusPopup.style.display = 'none';
        });
    }

    // Close popup when clicking outside the popup content area
    window.addEventListener('click', (e) => {
        if (e.target === statusPopup) {
            statusPopup.style.display = 'none';
        }
    });

    // Handle submit button click inside popup
    if (submitStatusBtn) {
        submitStatusBtn.addEventListener('click', () => {
            const email = document.getElementById('statusEmail').value.trim();
            if (email === '') {
                return alert('Please enter your email.');
            }
            // In a real app, this would also be a fetch call to the server
            alert(`Checking status for ${email}...`);
            statusPopup.style.display = 'none';
        });
    }
