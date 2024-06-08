const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newTask = todoInput.value.trim();  // trim usuwa puste znaki np. spację na końcu

    if(newTask === '') {
        alert('Wpisz zadanie');
        return; // zatrzymuje dodanie pustego pola do listy
    }
    
    addTask(newTask);
});

function addTask(newTask) {  
    createTask(newTask);
    todoInput.value = ''; // wyczyszczenie inputa   
}

function createTask(newTask) {
    const task = document.createElement('li');
    const taskDiv = document.createElement('div');
    const taskSpan = document.createElement('span');
    const checkbox = document.createElement('input');
    const deleteButton = document.createElement('button');

    taskSpan.textContent = newTask;
    checkbox.type = 'checkbox';
    deleteButton.textContent = 'Delete';

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskSpan);
    task.appendChild(taskDiv);
    task.appendChild(deleteButton);
    todoList.appendChild(task);
    
}
