

const button = document.getElementById("check-btn");
const form = document.getElementById("form");




const displayResult = () => {
    // trim removes whitespace from the beginning and end of the input
    const textInput = document.getElementById("text-input").value.trim(); 
    const result = document.getElementById("result");

    if (!textInput) {
        alert("Please input a value");
        return;
    }

    const isPalindrome = checkPalindrome(textInput);
    const resultText = isPalindrome ? `${textInput} is a palindrome` : `${textInput} is not a palindrome`;

    result.textContent = resultText; 

};


const checkPalindrome = (str) => {
    //Cleans the input from non-alphanumeric characters / lower case
    const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    //first creates an array out of cleaned string, then reverse it and make it a string again
    const reversedStr = cleanedStr.split("").reverse().join("");
    // compares the original input with the reversed one
    return cleanedStr === reversedStr;  

};


form.addEventListener("submit", (e) => {
    e.preventDefault();
    displayResult();
});
button.addEventListener("click", displayResult);

