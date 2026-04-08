const input_text = document.getElementById("ip")
const output_text = document.getElementById("op")

input_text.addEventListener("input" , () => {
    output_text.textContent = input_text.value
})