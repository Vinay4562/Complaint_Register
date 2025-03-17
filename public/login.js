    // Toggle Hamburger Menu
    document.querySelector('.hamburger').addEventListener('click', function() {
        document.querySelector('.navbar').classList.toggle('active');
    });

    // Form submission handling
    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                window.location.href = '/complaints';
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
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

    // Clear form fields on page load
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    });

    // Prevent back button from showing cached pages
    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", function () {
        window.location.reload(true);
    });