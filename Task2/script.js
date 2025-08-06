// script.js

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const resetBtn = document.getElementById("resetBtn");

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;

  span.addEventListener("dblclick", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = span.textContent;
    input.className = "edit-input";

    input.addEventListener("blur", () => {
      span.textContent = input.value.trim() || span.textContent;
      li.replaceChild(span, input);
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") input.blur();
    });

    li.replaceChild(input, span);
    input.focus();
  });

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateProgress();
  });

  const deleteBtn = document.createElement("span");
  deleteBtn.textContent = "🗑";
  deleteBtn.classList.add("remove-btn");
  deleteBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    li.remove();
    updateProgress();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = "";
  updateProgress();
}

function updateProgress() {
  const totalTasks = taskList.children.length;
  const completedTasks = Array.from(taskList.children).filter(task =>
    task.classList.contains("completed")
  ).length;

  progressText.textContent = `${completedTasks} / ${totalTasks} completed`;
  const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  progressFill.style.width = `${percentage}%`;
}

function resetTasks() {
  taskList.innerHTML = "";
  updateProgress();
}

resetBtn.addEventListener("click", resetTasks);