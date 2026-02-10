const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todoList");
const searchInput = document.getElementById("searchInput");

const setAllActive = document.getElementById("setAllActive");
const setAllCompleted = document.getElementById("setAllCompleted");
const clearCompleted = document.getElementById("clearCompleted");
const clearAll = document.getElementById("clearAll");

addBtn.addEventListener("click", addTodo);
searchInput.addEventListener("input", searchTodo);
setAllCompleted.addEventListener("click", () => setAll(true));
setAllActive.addEventListener("click", () => setAll(false));
clearCompleted.addEventListener("click", clearCompletedTodos);
clearAll.addEventListener("click", () => list.innerHTML = "");

function addTodo() {
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onchange = () => li.classList.toggle("completed");

  const span = document.createElement("span");
  span.textContent = text;

  const actions = document.createElement("div");
  actions.className = "actions";

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.className = "edit";
  editBtn.onclick = () => editTodo(span);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.className = "delete";
  deleteBtn.onclick = () => li.remove();

  actions.append(editBtn, deleteBtn);
  li.append(checkbox, span, actions);
  list.appendChild(li);

  input.value = "";
}

function editTodo(span) {
  const newText = prompt("Edit task:", span.textContent);
  if (newText && newText.trim()) {
    span.textContent = newText;
  }
}

function searchTodo() {
  const value = searchInput.value.toLowerCase();
  document.querySelectorAll("li").forEach(li => {
    li.style.display = li.innerText.toLowerCase().includes(value)
      ? "flex"
      : "none";
  });
}

function setAll(completed) {
  document.querySelectorAll("li").forEach(li => {
    li.classList.toggle("completed", completed);
    li.querySelector("input[type='checkbox']").checked = completed;
  });
}

function clearCompletedTodos() {
  document.querySelectorAll(".completed").forEach(li => li.remove());
}
