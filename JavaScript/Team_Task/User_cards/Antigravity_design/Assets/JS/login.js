// Toast notification helper
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const bgs = type === 'success' ? 'bg-emerald-500/90 border-emerald-500/50' : 'bg-red-500/90 border-red-500/50';
    
    toast.className = `flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium border backdrop-blur-md transform transition-all duration-300 translate-y-10 opacity-0 ${bgs}`;
    
    const icon = type === 'success' 
        ? `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`
        : `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;

    toast.innerHTML = `
        ${icon}
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.add('opacity-0', 'scale-95');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

const login_btn = document.getElementById("loginBtn");

login_btn.addEventListener("click", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        showToast("Please fill in both fields", "error");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
        showToast("Invalid Email or Password", "error");
        return;
    }

    user.is_active = true;

    localStorage.setItem("users", JSON.stringify(users));

    showToast("Login Successful!", "success");

    setTimeout(() => {
        window.location.href = "User_cards.html";
    }, 1000);
});