const hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
const clickButton = document.getElementById("btn");
const currentColor = document.querySelector(".current-color");

clickButton.addEventListener("click", () => {
    let hexColor = "#";

    for (let i = 0; i < 6; i++) {
        hexColor += hex[getRandomNumber()];
    }

    document.body.style.backgroundColor = hexColor;
    currentColor.innerText = hexColor; 

});

const getRandomNumber = () => Math.floor(Math.random() * hex.length);
