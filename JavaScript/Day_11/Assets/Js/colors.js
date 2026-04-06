const rbtn = document.getElementById("redbtn")
const ybtn = document.getElementById("yellowbtn")
const gbtn = document.getElementById("greenbtn")
const circle_1 = document.getElementById("circle")

rbtn.addEventListener("click" , () => {
    
    circle_1.style.backgroundColor = "red"
    circle_1.innerHTML = "Stop"
    circle_1.style.color = "white"
})


ybtn.addEventListener("click" , () => {
    
    circle_1.style.backgroundColor = "yellow"
    circle_1.innerHTML = "Pending"
    circle_1.style.color = "black"
})


gbtn.addEventListener("click" , () => {
    
    circle_1.style.backgroundColor = "green"
    circle_1.innerHTML = "Start"
    circle_1.style.color = "white"
})