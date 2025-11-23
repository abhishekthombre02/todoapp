const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  createTaskElement(taskText, false);
  saveTask(taskText, false);

  taskInput.value = "";
}

// Create task UI element
function createTaskElement(text, completed) {
  const li = document.createElement("li");
  li.classList.add("task-item");

  li.innerHTML = `
    <span class="task-text ${completed ? "completed" : ""}">${text}</span>
    <div>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  li.addEventListener("click", function (e) {
    // Delete task
    if (e.target.classList.contains("delete-btn")) {
      li.remove();
      deleteTask(text);
    } 
    // Mark task completed
    else {
      const span = li.querySelector(".task-text");
      span.classList.toggle("completed");
      updateCompletion(text, span.classList.contains("completed"));
    }
  });

  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(text, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(t => createTaskElement(t.text, t.completed));
}

// Delete task from localStorage
function deleteTask(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update completed status in localStorage
function updateCompletion(text, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
  tasks = tasks.map(t => 
    t.text === text ? { ...t, completed: completed } : t
  );
  
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
