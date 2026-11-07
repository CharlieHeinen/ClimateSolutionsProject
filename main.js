function main() {
    console.log("Hello World!")

    let textbox = document.getElementById("main-textbox")

    let button = document.getElementById("button")
    button.onclick = () => {
        console.log(textbox.value)
    }
}

window.onload = main