// Login page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Redirect if already logged in
    const currentUser = getCurrentUser();
    if (currentUser) {
        window.location.href = 'index.html';
        return;
    }
    
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Validate login
            const user = validateLogin(email, password);
            
            if (user) {
                // Set current user (excluding password)
                setCurrentUser({
                    name: user.name,
                    email: user.email
                });
                
                // Redirect to home page
                window.location.href = 'index.html';
            } else {
                // Show error
                errorMessage.textContent = 'Invalid email or password';
                errorMessage.style.display = 'block';
            }
        });
    }
});
