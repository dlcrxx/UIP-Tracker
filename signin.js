// Elements to use
const container = document.getElementById('container');
const signUpBtn = document.querySelector('.sign-up-btn'); // Select the Sign Up button
const signInBtn = document.getElementById('signInBtn');
const togglePassword = document.getElementById('togglePassword');
const password = document.getElementById('password');

const checkStatusBtn = document.querySelector('.check-status-btn');
const statusPopup = document.getElementById('statusPopup');
const closePopupBtn = document.getElementById('closePopup');
const submitStatusBtn = document.getElementById('submitStatus');

// Redirect to signup.html when Sign Up button is clicked
if (signUpBtn) {
  signUpBtn.addEventListener('click', () => {
    window.location.href = 'signup.html'; // Redirect to signup.html
  });
}

// Existing code for sign-in button and password toggle
if (signInBtn && container) {
  signInBtn.addEventListener('click', (e) => {
      e.preventDefault();
      container.classList.remove('sign-up-mode');
  });
}

// Toggle password visibility on sign-in form
if (togglePassword && password) {
  togglePassword.addEventListener('click', () => {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
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
      alert('Please enter your email.');
      return;
    }

    alert(`Checking status for ${email}...`);
    statusPopup.style.display = 'none';
  });
}
