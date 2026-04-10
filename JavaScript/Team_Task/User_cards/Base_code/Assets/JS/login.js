const login_btn = document.getElementById("loginBtn")

login_btn.addEventListener("click", (event) => {

    event.preventDefault()

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    let users = JSON.parse(localStorage.getItem("users")) || []

    const user = users.find((u) => u.email === email && u.password === password)

    if(!user){
        alert("Invalid Email or Password")
        return
    }

    user.is_active = true

    localStorage.setItem("users", JSON.stringify(users))

    alert("Login Successful")

    window.location.href = "User_cards.html"

})