loadTasks();

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskDateTime = document.getElementById("taskDateTime");
  const errorMessage = document.getElementById("errorMessage");

  if (taskInput.value.trim() === "") {
    errorMessage.textContent = "Please enter a task.";
    return;
  }

  errorMessage.textContent = "";

  const taskList = document.getElementById("taskList");
  const taskText = taskInput.value;
  const taskTime = taskDateTime.value;
  const taskItem = document.createElement("li");

  taskItem.innerHTML = `
        <span class="task-time">${taskTime}</span>
        <span>${taskText}</span>
        
        <div class="task-actions">
            <button class="delete-btn" onclick="deleteTask(this)"><i class="fas fa-trash"></i></button>
            <button class="edit-btn" onclick="editTask(this)"><i class="fas fa-edit"></i></button>
            <button class="important-btn" onclick="toggleImportance(this)"><i class="fas fa-star"></i></button>
            <button class="complete-btn" onclick="toggleCompletion(this)"><i class="fas fa-check"></i></button>
        </div>
    `;

  taskList.insertBefore(taskItem, taskList.firstChild);

  saveTask({
    text: taskText,
    time: taskTime,
    important: false,
    completed: false,
  });

  taskInput.value = "";
  taskDateTime.value = "";
}

function deleteTask(button) {
  const taskItem = button.parentNode.parentNode;
  const taskText = taskItem.querySelector("span").textContent;

  if (confirm(`Are you sure you want to delete "${taskText}"?`)) {
    taskItem.remove();
    deleteTaskFromStorage(taskText);
  }
}

function saveTask(task) {
  let tasks = getTasksFromStorage();
  tasks.unshift({ ...task, completed: false, important: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTaskFromStorage(taskText) {
  let tasks = getTasksFromStorage();
  tasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
  const taskList = document.getElementById("taskList");
  const tasks = getTasksFromStorage();

  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
            <span class="task-time">${task.time}</span>
            <span>${task.text}</span>
            
            <div class="task-actions">
                <button class="delete-btn" onclick="deleteTask(this)"><i class="fas fa-trash"></i></button>
                <button class="edit-btn" onclick="editTask(this)"><i class="fas fa-edit"></i></button>
                <button class="important-btn" onclick="toggleImportance(this)"><i class="fas fa-star"></i></button>
                <button class="complete-btn" onclick="toggleCompletion(this)"><i class="fas fa-check"></i></button>
            </div>
        `;

    if (task.completed) {
      taskItem.classList.add("completed");
    }

    if (task.important) {
      taskItem.classList.add("important");
    }

    taskList.appendChild(taskItem);
  });
}

function editTask(button) {
  const taskItem = button.parentNode.parentNode;
  const taskTextElement = taskItem.querySelector("span");
  const taskText = taskTextElement.textContent;
  const newTaskText = prompt("Edit task:", taskText);

  if (newTaskText !== null) {
    taskTextElement.textContent = newTaskText;
    updateTaskInStorage(taskText, newTaskText);
  }
}

function updateTaskInStorage(oldText, newText) {
  let tasks = getTasksFromStorage();
  const taskToUpdate = tasks.find((task) => task.text === oldText);

  if (taskToUpdate) {
    taskToUpdate.text = newText;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function toggleImportance(button) {
  const taskItem = button.parentNode.parentNode;
  taskItem.classList.toggle("important");
  updateTaskImportanceInStorage(taskItem);
}

function updateTaskImportanceInStorage(taskItem) {
  const tasks = getTasksFromStorage();
  const taskText = taskItem.querySelector("span").textContent;
  const taskToUpdate = tasks.find((task) => task.text === taskText);

  if (taskToUpdate) {
    taskToUpdate.important = !taskToUpdate.important;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function toggleCompletion(button) {
  const taskItem = button.parentNode.parentNode;
  taskItem.classList.toggle("completed");
  updateTaskCompletionInStorage(taskItem);
}

function updateTaskCompletionInStorage(taskItem) {
  const tasks = getTasksFromStorage();
  const taskText = taskItem.querySelector("span").textContent;
  const taskToUpdate = tasks.find((task) => task.text === taskText);

  if (taskToUpdate) {
    taskToUpdate.completed = !taskToUpdate.completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}
