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
        const li = createTask(taskElement, group);
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
    const uniqId = 'id' + (new Date()).getTime();
    
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
        completed: false,
        taskId: uniqId
    }
        
    createTask(task);
    addTask(task);
    todoInput.value = ''; 
}

const createTask = (task, group) => {
    const todoTask = document.createElement('li');
    todoTask.className = task.completed ? 'styleComplete' : '';
    todoTask.setAttribute('id', task.taskId);

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
        const indexTaskToRemove  = group.tasks.findIndex(task => task.taskId === todoTask.getAttribute('id'));
        group.tasks.splice(indexTaskToRemove, 1);
        saveGroup();
        loadGroups();
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

// naprawa programu
// podzielić na pliki
// korzystać z vite