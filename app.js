// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
// event listener to when page is loaded
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

// Functions

function addTodo(event) {
  event.preventDefault();
  // Todo DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  // Create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  // ADD TODO TO LOCALSTORAGE
  saveLocalTodos(todoInput.value);
  // CHECK MARK BUTTON
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i> ';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
  // TRASH BUTTON
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i> ';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);
  // APPEND TO LIST
  todoList.appendChild(todoDiv);
  // CLEAR TODO INPUT VALUE
  todoInput.value = '';
}

function deleteCheck(e) {
  const item = e.target;
  const todo = item.parentElement;

  // DELETE TODO
  if (item.classList[0] === 'trash-btn') {
    // Animation
    todo.classList.add('fall');
    // Remove todo from local storage
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
  }

  // CHECK MARK
  if (item.classList[0] === 'complete-btn') {
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;

  todos.forEach(function (todo) {
    // if (e.target.value === 'completed') {
    //   if (todo.classList.contains('completed')) {
    //     todo.style.display = 'none';
    //   }
    // }
    switch (e.target.value) {
      // incase you click on all show all the todos
      case 'all':
        todo.style.display = 'flex';
        break;
      // incase you click on completed show only completed
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // CHECK -- IS IT ALREADY IN LOCAL STORAGE
  let todos;
  if (localStorage.getItem('todos') === null) {
    // If not, then create an empty array
    todos = [];
  } else {
    // If we do have todos already, we'll have an array
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  // Then we'll just push new todos into that array
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;
  // Check - hey do we have something in local storage?
  if (localStorage.getItem('todos') === null) {
    // If not, then create an empty array
    todos = [];
  } else {
    // If we do have todos already, we'll have an array
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function (todo) {
    // Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i> ';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    // TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i> ';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  // Check - hey do we have something in local storage?
  if (localStorage.getItem('todos') === null) {
    // If not, then create an empty array
    todos = [];
  } else {
    // If we do have todos already, we'll have an array
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  // check array index of the one you select and the 1 means just remove 1
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
