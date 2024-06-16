// Pobranie potrzebnych elementów z HTML i zapisanie ich do zmiennych, żeby potem ich używać w programie
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
// const todoList = document.getElementById('todoList');
const todoGroup = document.getElementById('groups');
const todoListImportant = document.getElementById('todoListImportant');
const todoListNeutral = document.getElementById('todoListNeutral');
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];  //ta tablica służy mi do operacji w localStorage do zapisywania wszystkich zadań w jednej tablicy, pomocne to jest przy zaznaczaniu wszystkich zadań
const checkboxCheckAllTasks = document.getElementById('checkAllTasks');

// od razu nasłuchuje na załadowanie zadań z localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// tu "pobieram" moj formularz i nasłuchuje, czy kliknięto "dodaj" lub wciśnięto enter
todoForm.addEventListener('submit', (event) => {
    event.preventDefault(); // zatrzymuje domyślną operację, czyli zatrzymuje wysyłanie formularza
    getNewTask(); // wywołanie funkcji, która pobierze mi wpisane zadanie
});

// Tutaj nasłuchuja na zmianę statusu checkboxa, jest tu uzyta tablica tasks z localStorage i dla każdego zadania "task" z tablicy "tasks" zrób to samo, czyli zmień status checkboxa
checkboxCheckAllTasks.addEventListener("change", () => {
    tasks.forEach(task => { 
        checkboxCheckAllTasks.checked ? task.completed = true : task.completed = false;
        saveTasks();
        renderTasks();
    })
});

// pobieranie nowego zadania i grupy
function getNewTask() {  
    const newTask = todoInput.value.trim();  // trim usuwa puste znaki np. spację na końcu
    const selectedGroup = todoGroup.value;

    if(newTask === '') {
        alert('Wpisz zadanie');
        return; // zatrzymuje dodanie pustego pola do listy
    }

    // stworzenie zadania jako obiektu, który będzie miał 3 parametry
    let task = {
        text: newTask,
        completed: false,
        group: selectedGroup
    }

    createTask(task); // najpierw tworzymy nasze li
    addTask(task); // a potem dodajemy nasze zadanie
    todoInput.value = ''; // wyczyszczenie inputa       
}

// towrzenie zadania, czyli dodawanie odpowiednich elementów z HTML i klas. 
function createTask(newTask, indexTask) {
    const task = document.createElement('li');
    task.className = 'todoItem';
    task.className = newTask.completed ? 'styleComplete' : ''; // newtask to jest to samo co task z 40 linii, a task to jest to co pobralismy w linii 53 (pozmieniać potem te nazwy, bo może się mylić)

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
    
    // todoList.appendChild(task);
    if(newTask.group === 'important') {
        todoListImportant.appendChild(task);
    } else {
        todoListNeutral.appendChild(task);
    }
}

// dodajemy zadanie do tablicy tasks
function addTask(task) {   
    tasks.push(task);
    const indexTask = tasks.length - 1;
    saveTasks();
    renderTasks(indexTask);
}

// zapisywanie tablicy tasks do localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    renderTasks();
}

// wyrenderowanie zadań na ekranie
function renderTasks() {
    // todoList.innerHTML = '';
    todoListImportant.innerHTML = '';
    todoListNeutral.innerHTML = '';
    tasks.forEach((task, indexTask) => {
        createTask(task, indexTask);
    })
}


// naprawa programu
// podzielić na pliki
// korzystać z vite