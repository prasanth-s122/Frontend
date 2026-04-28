let users = JSON.parse(localStorage.getItem("users")) || []

const active_user = users.find((u) => u.is_active === true)

if(!active_user){

    alert("Login First")

    window.location.href = "login.html"

}





const card_container = document.getElementById("card_container")

const fetch_users = async () => {

    

        const fetch_data = await fetch("https://dummyjson.com/users?limit=18")

        const data = await fetch_data.json()

        const users = data.users

        users.forEach((user) => {

           
            

            let cards = `
               <div class=" bg-white w-50 h-70 rounded-lg border-2 flex flex-col justify-between items-center shadow-xl shadow-gray-700/80 hover:scale-130 transition duration-700 hover:shadow-red-700/80 hover:cursor-pointer hover:bg-slate-200  ">
                    <img class="rounded-lg " src="${user.image}" alt="user">
                    <h3 class=" text-center">${user.firstName}</h3>
                    <p class=" p-1 text-center">Age : ${user.age}</p>
               </div>
            `

            card_container.innerHTML += cards

        })

    
    

}

fetch_users()

const logout_btn = document.getElementById("logout")

logout_btn.addEventListener("click", () => {

    let users = JSON.parse(localStorage.getItem("users")) || []

    users.forEach(user => user.is_active = false)

    localStorage.setItem("users", JSON.stringify(users))

    window.location.href = "login.html"

})