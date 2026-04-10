// Toast notification helper
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    let bgs = 'bg-blue-500/90 border-blue-500/50';
    if (type === 'error') bgs = 'bg-red-500/90 border-red-500/50';
    
    toast.className = `flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium border backdrop-blur-md transform transition-all duration-300 translate-y-10 opacity-0 ${bgs}`;
    
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => toast.classList.remove('translate-y-10', 'opacity-0'), 10);
    setTimeout(() => {
        toast.classList.add('opacity-0', 'scale-95');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Authentication Check
let users = JSON.parse(localStorage.getItem("users")) || [];
const active_user = users.find((u) => u.is_active === true);

if (!active_user) {
    window.location.href = "login.html";
}

const card_container = document.getElementById("card_container");

const fetch_users = async () => {
    try {
        const fetch_data = await fetch("https://dummyjson.com/users?limit=12");
        const data = await fetch_data.json();
        const usersData = data.users;

        // Optimization: Create a single HTML string to prevent multiple DOM repaints
        let allCardsHTML = '';

        usersData.forEach((user) => {
            allCardsHTML += `
               <div class="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col justify-between items-center shadow-lg hover:bg-white/10 transition duration-300 transform hover:-translate-y-2 hover:shadow-indigo-500/20 overflow-hidden cursor-pointer relative pb-4">
                    
                    <div class="w-full h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 absolute top-0 left-0 z-0"></div>
                    
                    <div class="relative z-10 w-24 h-24 mt-6 mb-4 rounded-full border-4 border-slate-900 bg-white/10 overflow-hidden shadow-xl group-hover:scale-105 transition duration-300">
                        <img class="w-full h-full object-cover" src="${user.image}" loading="lazy" alt="${user.firstName}">
                    </div>
                    
                    <div class="relative z-10 text-center px-4 w-full">
                        <h3 class="text-xl font-semibold tracking-tight text-white mb-1 truncate">${user.firstName} ${user.lastName}</h3>
                        <div class="flex justify-center items-center gap-1.5 text-gray-300 text-sm">
                            <span class="px-2 py-0.5 rounded-full bg-black/30 border border-white/5 text-xs font-medium">Age: ${user.age}</span>
                            <span class="px-2 py-0.5 rounded-full bg-black/30 border border-white/5 text-xs font-medium">${user.gender}</span>
                        </div>
                        <p class="mt-3 text-sm text-gray-400 truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            ${user.email}
                        </p>
                    </div>

               </div>
            `;
        });

        // Single DOM assignment
        card_container.innerHTML = allCardsHTML;

    } catch (error) {
        showToast("Failed to fetch users.", "error");
        console.error(error);
    }
};

fetch_users();

const logout_btn = document.getElementById("logout");

logout_btn.addEventListener("click", () => {
    let currentUsers = JSON.parse(localStorage.getItem("users")) || [];
    currentUsers.forEach(user => user.is_active = false);
    localStorage.setItem("users", JSON.stringify(currentUsers));

    showToast("Logging out...");
    setTimeout(() => {
        window.location.href = "login.html";
    }, 500);
});