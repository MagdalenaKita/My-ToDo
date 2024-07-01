const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');

const groupForm = document.getElementById('groupForm');
const groupInput = document.getElementById('groupInput');
const selectGroups = document.getElementById('selectGroups');
const listGroup = document.getElementById('listGroup');

const checkboxCheckAllTasks = document.getElementById('checkAllTasks');

const groups = JSON.parse(localStorage.getItem('groups')) || [];

let draggedItem = null;


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
    todoTask.setAttribute('draggable', true);
    todoTask.classList.add('drag-item');

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
    const handleDeleteTask = () => {  
        
        const indexTaskToRemove  = group.tasks.findIndex(({ taskId }) => taskId === task.taskId);  //destrukturyzacja 
        group.tasks.splice(indexTaskToRemove, 1);
        saveGroup();
        loadGroups();
    }
    deleteTaskButton.addEventListener('click', handleDeleteTask);

    todoTaskDiv.appendChild(todoTaskCheckbox);
    todoTaskDiv.appendChild(todoTaskSpan);
    todoTask.appendChild(todoTaskDiv);
    todoTask.appendChild(deleteTaskButton);

    todoTask.addEventListener('dragstart', handleDragStart);
    todoTask.addEventListener('dragover', handleDragOver);
    todoTask.addEventListener('drop', handleDrop);

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

const handleDragStart = (event) => {
    draggedItem = event.target;
    event.dataTransfer.effectAllowed = 'move';
    // event.dataTransfer.setData('text/html', draggedItem.innerHTML);
    draggedItem.classList.add('draggedItemStyle');
}

const handleDragOver = (event) => {
    event.preventDefault();
}

const handleDrop = (event) => {
    event.preventDefault();
    const targetItem = event.target; 
    // targetItem.parentNode.prepend(draggedItem);  

    const draggedGroupIndex = groups.findIndex((group) => group.groupName === draggedItem.parentNode.parentNode.firstChild.textContent);    
    const targetGroupIndex = groups.findIndex((group) => group.groupName === targetItem.parentNode.parentNode.firstChild.textContent);    

    const indexDraggedTask = groups[draggedGroupIndex].tasks.findIndex(task => task.text === draggedItem.firstChild.textContent);
    const taskText = groups[draggedGroupIndex].tasks[indexDraggedTask].text;
    const taskCompleted = groups[draggedGroupIndex].tasks[indexDraggedTask].completed;
    const taskTaskId = groups[draggedGroupIndex].tasks[indexDraggedTask].taskId;

    groups[draggedGroupIndex].tasks.splice(indexDraggedTask, 1);
    groups[targetGroupIndex].tasks.push({text: taskText, completed: taskCompleted, taskId: taskTaskId});

    draggedItem = null;
    
    saveGroup();
    loadGroups();
}

document.addEventListener('DOMContentLoaded', loadGroups);
groupForm.addEventListener('submit', getNewGroup);
todoForm.addEventListener('submit', getNewTask);
checkboxCheckAllTasks.addEventListener("change", markAllTasks);
