// Navigate views
function toggleView() {
    const loginView = document.getElementById('loginView');
    const registerView = document.getElementById('registerView');
    
    // Clear forms and messages
    document.getElementById('loginForm').reset();
    document.getElementById('registerForm').reset();
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('registerError').style.display = 'none';
    document.getElementById('registerSuccess').style.display = 'none';

    if (loginView.classList.contains('hidden')) {
        registerView.style.animation = 'none';
        registerView.classList.add('hidden');
        loginView.classList.remove('hidden');
        loginView.style.animation = 'fadeIn 0.5s ease-out';
    } else {
        loginView.style.animation = 'none';
        loginView.classList.add('hidden');
        registerView.classList.remove('hidden');
        registerView.style.animation = 'fadeIn 0.5s ease-out';
    }
}

// Handle Auth Logic via LocalStorage
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;
    const errorBox = document.getElementById('registerError');
    const successBox = document.getElementById('registerSuccess');

    errorBox.style.display = 'none';
    successBox.style.display = 'none';

    if (localStorage.getItem('user_' + username)) {
        errorBox.textContent = "Spartan ID already exists. Choose another.";
        errorBox.style.display = 'block';
        return;
    }

    // Save to LocalStorage
    localStorage.setItem('user_' + username, JSON.stringify({ password: password }));
    successBox.style.display = 'block';
    
    setTimeout(() => {
        toggleView();
    }, 1500);
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const errorBox = document.getElementById('loginError');

    errorBox.style.display = 'none';

    const savedUser = localStorage.getItem('user_' + username);
    if (!savedUser) {
        errorBox.textContent = "Spartan ID not found.";
        errorBox.style.display = 'block';
        return;
    }

    const userData = JSON.parse(savedUser);
    if (userData.password !== password) {
        errorBox.textContent = "Incorrect Passcode.";
        errorBox.style.display = 'block';
        return;
    }

    // Login successful
    localStorage.setItem('active_session', username);
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
});

// Check if already logged in
window.addEventListener('load', () => {
    if (localStorage.getItem('active_session')) {
        window.location.href = 'dashboard.html';
    }
});
