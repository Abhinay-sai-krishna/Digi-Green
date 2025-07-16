const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})

document.querySelector('.form-box.login form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission
    window.location.href = 'Dashboard.html'; // Redirect to Dashboard.html
});