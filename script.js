const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const li = document.createElement("li");
  li.classList.add("task-item");

  li.innerHTML = `
    <span class="task-text">${taskText}</span>
    <div>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  li.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
      li.remove();
    } else {
      li.querySelector(".task-text").classList.toggle("completed");
    }
  });

  taskList.appendChild(li);
  taskInput.value = "";
}

