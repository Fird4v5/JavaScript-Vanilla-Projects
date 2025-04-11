const convertBtn = document.getElementById("convert-btn");

const checkInputAndConvertToRoman = () => {
    const inputNumber = document.getElementById("number").value;
    const output = document.getElementById("output");
    output.style.color = "red";

    if (inputNumber === "") {
        return output.innerText = "Please enter a valid number";
     } 
     else if (inputNumber < 1) {
        return output.innerText = "Please enter a number greater than or equal to 1";
     } 
     else if (inputNumber >= 4000) {
        return output.innerText = "Please enter a number less than or equal to 3999";
     }

        output.style.color = "";
        output.innerText = convertToRoman(inputNumber);  
     

};

convertBtn.addEventListener("click", checkInputAndConvertToRoman);

document.getElementById("number").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        checkInputAndConvertToRoman();
        return;
    }
})


const convertToRoman = (num) => {

    const RomanNumerals = [
        {value: 1000, numeral: "M"},
        {value: 900, numeral: "CM"},
        {value: 500, numeral: "D"},
        {value: 400, numeral: "CD"},
        {value: 100, numeral: "C"},
        {value: 90, numeral: "XC"},
        {value: 50, numeral: "L"},
        {value: 40, numeral: "XL"},
        {value: 10, numeral: "X"},
        {value: 9, numeral: "IX"},
        {value: 5, numeral: "V"},
        {value: 4, numeral: "IV"},
        {value: 1, numeral: "I"}
    ];
    

    let result = "";

    for (const {value, numeral} of RomanNumerals) {
        while (num >= value) {
            result += numeral;
            num -= value;
        }
    }

    return result;
};



