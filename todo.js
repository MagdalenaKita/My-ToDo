const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');

const groupForm = document.getElementById('groupForm');
const groupInput = document.getElementById('groupInput');
const selectGroups = document.getElementById('selectGroups');
const listGroup = document.getElementById('listGroup');

const checkboxCheckAllTasks = document.getElementById('checkAllTasks');

const groups = JSON.parse(localStorage.getItem('groups')) || [];


const getNewGroup = (event) => {
    event.preventDefault();
    const newGroup = groupInput.value.trim();

    if(newGroup === '') {
        alert('Wpisz nazwę grupy');
        return; // zatrzymuje dodanie pustego pola do listy
    }

    let group = {
        groupName: newGroup,
        tasks: []
    }

    createGroup(group);
    addGroup(group);
    groupInput.value = '';
}

const createGroup = (group) => {
    const createdGroup = document.createElement('li');
    const headerGroup = document.createElement('h3');
    const groupTaskList = document.createElement('ul');

    headerGroup.textContent = group.groupName;
    groupTaskList.className = 'listTask';

    group.tasks.forEach(taskElement => {
        // const index = group.tasks.length - 1;
        const li = createTask(taskElement);
        groupTaskList.appendChild(li);
    });

    createdGroup.appendChild(headerGroup);
    createdGroup.appendChild(groupTaskList);
    listGroup.appendChild(createdGroup);
}

const addGroup = (group) => {
    groups.push(group);
    saveGroup();
    loadGroups();
}

const loadGroupsToSelect = () => {   
    selectGroups.innerHTML = '<option value="">Wybierz grupę</option>'; 
    groups.forEach(group => {
        const groupOption = document.createElement('option');
        groupOption.value = group.groupName;
        groupOption.textContent = group.groupName;
        selectGroups.appendChild(groupOption);
    });    
}

const getNewTask = (event) => {
    event.preventDefault();
    const newTask = todoInput.value.trim();

    if(newTask === '') {
        alert('Wpisz zadanie');
        return; // zatrzymuje dodanie pustego pola do listy
    }

    if(groups.length == 0) {
        alert('Proszę wpisać najpierw grupę');
        return;
    }

    if(selectGroups.value === 'Wybierz grupę') {
        alert('Proszę wybrać grupę');
        return;
    }

    let task = {
        text: newTask,
        completed: false
    }
        
    createTask(task);
    addTask(task);
    todoInput.value = ''; 
}

const createTask = (task) => {

    // const indexGroup = groups.findIndex(group => group.groupName);

    // const indexTask = groups[indexGroup].tasks.length - 1;

    const todoTask = document.createElement('li');
    todoTask.className = task.completed ? 'styleComplete' : '';

    const todoTaskDiv = document.createElement('div');

    const todoTaskSpan = document.createElement('span');
    todoTaskSpan.textContent = task.text;

    const todoTaskCheckbox = document.createElement('input');
    todoTaskCheckbox.type = 'checkbox';
    todoTaskCheckbox.checked = task.completed;
    
    todoTaskCheckbox.addEventListener('change', () => {
        task.completed = !task.completed;
        saveGroup();
        loadGroups();
    })

    const deleteTaskButton = document.createElement('button');
    deleteTaskButton.textContent = 'Usuń';
    deleteTaskButton.className = 'deleteTaskButton';

    deleteTaskButton.addEventListener('click', () => {
        // groups[indexGroup].tasks.splice(indexTask, 1);
        // console.log("Usuniecie grupy", indexGroup);
        // console.log("Usuniecie zadania", indexTask);
        // saveGroup();
        // loadGroups();
    })

    todoTaskDiv.appendChild(todoTaskCheckbox);
    todoTaskDiv.appendChild(todoTaskSpan);
    todoTask.appendChild(todoTaskDiv);
    todoTask.appendChild(deleteTaskButton);

    return todoTask;
}

const addTask = (task) => {
    const selectGroupName = selectGroups.value;
    const indexGroupToSaveTask = groups.findIndex(group => selectGroupName === group.groupName);
    groups[indexGroupToSaveTask].tasks.push(task);
    // const indexTask = groups[indexGroupToSaveTask].tasks.length - 1;
    
    saveGroup();
    loadGroups();
}

const saveGroup = () => {
    localStorage.setItem('groups', JSON.stringify(groups));
}

const loadGroups = () => {
    listGroup.innerHTML = '';
    loadGroupsToSelect();
    groups.forEach((group) => {
        createGroup(group);
    })
}

const markAllTasks = () => {
    groups.forEach(group => {
        group.tasks.forEach(task => {
            checkboxCheckAllTasks.checked ? task.completed = true : task.completed = false;
            saveGroup();
            loadGroups();
        })
    })
}

document.addEventListener('DOMContentLoaded', loadGroups);
groupForm.addEventListener('submit', getNewGroup);
todoForm.addEventListener('submit', getNewTask);
checkboxCheckAllTasks.addEventListener("change", markAllTasks);



// towrzenie zadania, czyli dodawanie odpowiednich elementów z HTML i klas. 
// function createTask(newTask, indexTask) {
//     const task = document.createElement('li');
//     task.className = 'todoItem';
//     task.className = newTask.completed ? 'styleComplete' : ''; // newtask to jest to samo co task z 40 linii, a task to jest to co pobralismy w linii 53 (pozmieniać potem te nazwy, bo może się mylić)

//     const taskDiv = document.createElement('div');

//     const taskSpan = document.createElement('span');
//     taskSpan.textContent = newTask.text;

//     const checkbox = document.createElement('input');
//     checkbox.type = 'checkbox';
//     checkbox.checked = newTask.completed;
    
//     checkbox.addEventListener('change', () => {
//         newTask.completed = !newTask.completed;
//         saveTasks();
//         renderTasks(indexTask);
//     })

//     const deleteButton = document.createElement('button');
//     deleteButton.textContent = 'Usuń';
//     deleteButton.className = 'deleteTaskButton';
//     deleteButton.addEventListener('click', () => {
//         tasks.splice(indexTask, 1);        
//         saveTasks();
//         renderTasks(indexTask);
//     })

//     taskDiv.appendChild(checkbox);
//     taskDiv.appendChild(taskSpan);
//     task.appendChild(taskDiv);
//     task.appendChild(deleteButton);    
    
    // todoList.appendChild(task);
    // if(newTask.group === 'important') {
    //     todoListImportant.appendChild(task);
    // } else {
    //     todoListNeutral.appendChild(task);
    // }
// }

// dodajemy zadanie do tablicy tasks
// function addTask(task) {   
//     tasks.push(task);
//     const indexTask = tasks.length - 1;
//     saveTasks();
//     renderTasks(indexTask);
// }

// zapisywanie tablicy tasks do localStorage
// function saveTasks() {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// function loadTasks() {
//     renderTasks();
// }

// wyrenderowanie zadań na ekranie
// function renderTasks() {
//     // todoList.innerHTML = '';
//     todoListImportant.innerHTML = '';
//     todoListNeutral.innerHTML = '';
//     tasks.forEach((task, indexTask) => {
//         createTask(task, indexTask);
//     })
// }


// naprawa programu
// podzielić na pliki
// korzystać z vite