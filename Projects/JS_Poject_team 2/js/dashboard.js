window.addEventListener('load', () => {
    // Check if user is logged in
    const activeSession = localStorage.getItem('active_session');
    
    if (!activeSession) {
        // Redirect back to login if not logged in
        window.location.href = 'index.html';
        return;
    }

    // Display username
    document.getElementById('userDisplay').textContent = activeSession.toUpperCase();
});

// Handle Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('active_session');
    window.location.href = 'index.html';
});
