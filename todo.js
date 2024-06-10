const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

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

document.addEventListener('DOMContentLoaded', loadTasks);

function getNewTask() {  
    const newTask = todoInput.value.trim();  // trim usuwa puste znaki np. spację na końcu

    if(newTask === '') {
        alert('Wpisz zadanie');
        return; // zatrzymuje dodanie pustego pola do listy
    }

    let task = {
        text: newTask,
        completed: false
    }

    createTask(task);
    addTask(task);
    todoInput.value = ''; // wyczyszczenie inputa       
}

function createTask(newTask, indexTask) {
    const task = document.createElement('li');
    task.className = 'todoItem';
    task.className = newTask.completed ? 'styleComplete' : '';

    const taskDiv = document.createElement('div');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = newTask.text;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = newTask.completed;
    
    checkbox.addEventListener('change', () => {
        newTask.completed = !newTask.completed;
        saveTasks();
        renderTasks(indexTask);
    })

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Usuń';
    deleteButton.className = 'deleteTaskButton';
    deleteButton.addEventListener('click', () => {
        tasks.splice(indexTask, 1);
        saveTasks();
        renderTasks(indexTask);
    })

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskSpan);
    task.appendChild(taskDiv);
    task.appendChild(deleteButton);    

    todoList.appendChild(task);
}

function addTask(task) {    
    tasks.push(task);
    const indexTask = tasks.length - 1;
    saveTasks();
    renderTasks(indexTask);
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    renderTasks();
}

function renderTasks(indexTask) {
    todoList.innerHTML = '';
    tasks.forEach((task, indexTask) => {
        createTask(task, indexTask);
    })
}