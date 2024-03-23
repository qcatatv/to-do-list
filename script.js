let tasks = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    const taskDate = document.getElementById("taskDate").value;
    const taskTime = document.getElementById("taskTime").value;
    if (taskText === "" || taskDate === "") return;
    
    const newTask = {
        id: Date.now(),
        text: taskText,
        date: taskDate,
        time: taskTime,
        completed: false
    };
    tasks.push(newTask);
    
    renderTasks();
    taskInput.value = "";
    document.getElementById("taskDate").value = "";
    document.getElementById("taskTime").value = "";
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        if (task.completed) {
            taskItem.classList.add("completed");
        }
        taskItem.innerHTML = `
            <input class="checkbox" type="checkbox" onchange="toggleTask(${task.id})" ${task.completed ? 'checked' : ''}>
            <span>${task.text}</span>
            <span class="date">(${task.date})</span> <span class="date">(${task.time})</span>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

function toggleTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function filterTasks(filter) {
    let filteredTasks = [];
    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else {
        filteredTasks = tasks;
    }
    renderFilteredTasks(filteredTasks);
}

function renderFilteredTasks(filteredTasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    filteredTasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        if (task.completed) {
            taskItem.classList.add("completed");
        }
        taskItem.innerHTML = `
            <input class="checkbox" type="checkbox" onchange="toggleTask(${task.id})" ${task.completed ? 'checked' : ''}>
            <span>${task.text}</span>
            <span class="date">(${task.date})</span> <span class="date">(${task.time})</span>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
}
