const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    getNewTask()
});

todoForm.addEventListener('keypress', (event) => {
    event.preventDefault();
    if (event.key === 'Enter') {
        getNewTask()
    }
});

document.addEventListener('DOMContentLoaded', loadTaskFromLocalStorage);

function getNewTask() {
    const newTask = todoInput.value.trim();  // trim usuwa puste znaki np. spację na końcu

    if(newTask === '') {
        alert('Wpisz zadanie');
        return; // zatrzymuje dodanie pustego pola do listy
    }

    addTask(newTask);
}

function addTask(newTask) {     
    createTask(newTask);
    addTaskToLocalStorage(newTask);    

    todoInput.value = ''; // wyczyszczenie inputa       
}

function createTask(newTask) {
    const task = document.createElement('li');
    task.className = 'todoItem';

    const taskDiv = document.createElement('div');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = newTask;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // const deleteButton = document.createElement('button');
    // deleteButton.textContent = 'Usuń';
    // deleteButton.className = 'deleteTaskButton';

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskSpan);
    task.appendChild(taskDiv);
    // task.appendChild(deleteButton);
    todoList.appendChild(task);

    return task;
}

function addTaskToLocalStorage(newTask) {
    const tasksArray = getTaskFromLocalStorage();
    tasksArray.push(newTask);
    saveTaskToLocalStorage(tasksArray);    
}

function saveTaskToLocalStorage(tasksArray) {
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

function getTaskFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTaskFromLocalStorage() {
    const tasksArray = getTaskFromLocalStorage();
    todoList.innerHTML = '';
    tasksArray.forEach(task => {
        createTask(task);
    });
}
