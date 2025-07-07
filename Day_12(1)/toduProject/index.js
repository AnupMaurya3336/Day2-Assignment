const todoTableBody = document.getElementById("todoTableBody");
const todoInput = document.getElementById("todoInput");

let todos = [];

function addTodo() {
  const taskName = todoInput.value.trim();
  if (taskName === "") return alert("Please enter a task!");

  const todo = {
    id: Date.now(),
    name: taskName,
    status: "Pending"
  };

  todos.push(todo);
  todoInput.value = "";
  renderTodos();
}

function renderTodos() {
  todoTableBody.innerHTML = "";

  todos.forEach((todo) => {
    const row = document.createElement("tr");

    // Task Name
    const nameCell = document.createElement("td");
    nameCell.textContent = todo.name;

    // Status
    const statusCell = document.createElement("td");
    statusCell.textContent = todo.status;
    statusCell.className = todo.status === "Completed" ? "status-completed" : "status-pending";

    // Update button
    const updateCell = document.createElement("td");
    const updateBtn = document.createElement("input");
    updateBtn.type = "checkbox";
    updateBtn.disabled = todo.status === "Completed";
    updateBtn.checked = todo.status === "Completed";
    updateBtn.onclick = () => updateStatus(todo.id);
    updateCell.appendChild(updateBtn);

    // Delete button
    const deleteCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteTodo(todo.id);
    deleteCell.appendChild(deleteBtn);

    row.appendChild(nameCell);
    row.appendChild(statusCell);
    row.appendChild(updateCell);
    row.appendChild(deleteCell);

    todoTableBody.appendChild(row);
  });
}

function updateStatus(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, status: "Completed" } : todo
  );
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}
