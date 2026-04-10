const registerBtn = document.getElementById("registerBtn")

registerBtn.addEventListener("click", (event) => {

    event.preventDefault()
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    if(!name && !email && !password){

        alert("Fill the form")

    }else{

        const userData = {
        name: name,
        email: email,
        password: password
    }

        let users = JSON.parse(localStorage.getItem("users")) || []

        users.push(userData)

        localStorage.setItem("users", JSON.stringify(users))

        alert("Registered Successfully")

        window.location.href="Assets/login.html "

    }


})