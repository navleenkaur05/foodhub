// Register page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Redirect if already logged in
    const currentUser = getCurrentUser();
    if (currentUser) {
        window.location.href = 'index.html';
        return;
    }
    
    const registerForm = document.getElementById('registerForm');
    const errorMessage = document.getElementById('errorMessage');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validate passwords match
            if (password !== confirmPassword) {
                errorMessage.textContent = 'Passwords do not match';
                errorMessage.style.display = 'block';
                return;
            }
            
            // Check if user already exists
            if (userExists(email)) {
                errorMessage.textContent = 'An account with this email already exists';
                errorMessage.style.display = 'block';
                return;
            }
            
            // Create new user
            const newUser = {
                name,
                email,
                password // In a real app, this would be hashed
            };
            
            addUser(newUser);
            
            // Set current user (excluding password)
            setCurrentUser({
                name,
                email
            });
            
            // Redirect to home page
            window.location.href = 'index.html';
        });
    }
});
