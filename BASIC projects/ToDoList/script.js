const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === "") {
        alert("You should add a task first!");
    }
    else {
        let li = document.createElement("li");
        li.innerText = inputBox.value; 
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u2A2F";
        li.appendChild(span);
        saveData();
    }
    
    inputBox.value = ""; 
};


listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else {
        e.target.parentElement.remove();
        saveData();
    }
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();