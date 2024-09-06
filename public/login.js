// Example login script
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        window.location.href = '/dashboard'; // Redirect after login
    } else {
        alert('Invalid credentials');
    }
});

// Function to toggle password visibility
function togglePassword() {
    var passwordField = document.getElementById("password");
    var toggleText = document.querySelector(".toggle-password");
    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleText.textContent = "Hide";
    } else {
        passwordField.type = "password";
        toggleText.textContent = "Show";
    }
}