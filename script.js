const input = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");

const remaining = document.querySelector("#remaining");
const total = document.querySelector("#total");

const themeBtn = document.querySelector("#themeBtn");


if(localStorage.getItem("theme") === "dark"){

    document.body.classList.add("dark");

}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

addBtn.addEventListener("click", addTask);

input.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        addTask();

    }

});

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

    }

    else {

        localStorage.setItem("theme", "light");

    }


});

function addTask() {

    const task = input.value.trim();

    if (task === "") return;

    tasks.push({

        text: task,

        completed: false

    });

    input.value = "";

    saveTasks();

    renderTasks();

}

function renderTasks() {

    taskList.innerHTML = "";

    let completedCount = 0;

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        if (task.completed) {

            li.classList.add("completed");

            completedCount++;

        }

        li.innerHTML = `

        <span>${task.text}</span>

        <div>

        <button class="complete-btn">✔</button>

        <button class="delete-btn">🗑</button>

        </div>

        `;

        li.querySelector(".complete-btn").addEventListener("click", () => {

            tasks[index].completed = !tasks[index].completed;

            saveTasks();

            renderTasks();

        });

        li.querySelector(".delete-btn").addEventListener("click", () => {

            tasks.splice(index, 1);

            saveTasks();

            renderTasks();

        });

        taskList.appendChild(li);

    });

    total.textContent = tasks.length;

    remaining.textContent = tasks.length - completedCount;

}

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}