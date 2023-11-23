// Getting the random ID
const randomTaskId = () => {
  const randomTime = new Date().getTime();
  const randomNumber = Math.floor(Math.random() + 200 * 125896);
  return randomNumber * randomTime;
};
// Initializing the tasks
var tasks = loadFromLocalStorage();



// Getting DOM Elements
var errorPlace = document.querySelector("#errorMessage");
const taskTitleInput = document.querySelector("#todofield");
const taskComplexityInput = document.querySelector("#complexity");
const taskTimeInput = document.querySelector("#tasktime");
const taskSaveButton = document.querySelector("#saveButton");

// Saving tasks in the tasks Array
taskSaveButton.addEventListener("click", () => {
  //   Getting the input values
  var taskTitle = taskTitleInput.value;
  var taskComplexity = taskComplexityInput.value;
  var taskTime = taskTimeInput.value;
  if (taskTitle === "") {
    errorPlace.textContent = `Task title can't be empty.`;
    return;
  }
  if (taskComplexity === "Select Important Level" || taskComplexity === "") {
    errorPlace.textContent = "Please select Complexity level.";
  }
  alert(taskTime);

  var newTask = {
    id: randomTaskId(),
    name: taskTitle,
    Complexity: taskComplexity,
    time: taskTime,
    isCompleted: false,
  };
  tasks.push(newTask);
  //   send in local storage
  saveToLocalStorage(tasks);
  // Reload the tasks
  console.log(tasks);
});

// Save tasks to the localStorage
function saveToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load from the local storage
function loadFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
}


// Getting the Div for displaying the tasks
var tasksDisplayer = document.querySelector("#tasksDisplay");
loadTasksInDiv();
// Loading the tasks into the Div
function loadTasksInDiv() {
  tasks.forEach((task) => {
    var taskElement = document.createElement("div");
    taskElement.innerHTML = `
    <h2>${task.id}</h2>
    <p>${task.Complexity}</p>
    <p>
    <span> ${task.time}<span>
    <b> ${task.isCompleted}</b>
    </p>
    `;
    tasksDisplayer.appendChild(taskElement);
  });
}
