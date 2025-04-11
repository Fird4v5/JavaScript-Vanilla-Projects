const inputBox = document.getElementById("input-box");
const resultBox = document.getElementById("result-box");
const inputUnit = document.getElementById("input-unit");
const resultUnit = document.getElementById("result-unit");
const clearButton = document.querySelector(".btn");


const conversionFactors = {
    kilometer: {
        kilometer: 1, 
        meter: 1000,
        centimeter: 100000,
        millimeter: 1e+6,
        micrometer: 1e+9,
        nanometer: 1e+12,
        mile: 0.621371,
        yard: 1093.61,
        foot: 3280.84,
        inch: 39370.1,
        "nautical-mile": 0.539957
    },
    meter: {
        meter: 1,
        kilometer: 0.001,
        centimeter: 100,
        millimeter: 1000,
        micrometer: 1e+6,
        nanometer: 1e+9,
        mile: 0.000621371,
        yard: 1.09361,
        foot: 3.28084,
        inch: 39.3701,
        "nautical-mile": 0.000539957
    },
    centimeter: {
        centimeter: 1,
        kilometer: 1e-5,
        meter: 0.01,
        millimeter: 10,
        micrometer: 10000,
        nanometer: 1e+7,
        mile: 6.2137e-6,
        yard: 0.0109361,
        foot: 0.0328084,
        inch: 0.393701,
        "nautical-mile": 5.3996e-6
    }
}

inputBox.addEventListener("input", updateResult);
inputUnit.addEventListener("change", updateResult);
resultUnit.addEventListener("change", updateResult);
clearButton.addEventListener("click", clearInput);

function updateResult() {
    const input= parseFloat(inputBox.value);
    const  inputUnitAccess = inputUnit.value;
    const  resultUnitAcess = resultUnit.value;
    
    

    const conversionFactor = conversionFactors[inputUnitAccess][resultUnitAcess];
    const result = input * conversionFactor;


    return resultBox.value = result;
}

function clearInput() {
    inputBox.value = "";
    resultBox.value = "";
}

