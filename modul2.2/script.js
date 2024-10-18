const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

let editingTaskIndex = null;

// Fungsi untuk menambah task
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        if (editingTaskIndex !== null) {
            // Edit task
            const taskItem = taskList.children[editingTaskIndex];
            taskItem.firstChild.textContent = taskText;
            editingTaskIndex = null; // Reset editing index
            addTaskButton.innerHTML = '<i class="fa-solid fa-user-plus"></i>'; // Reset button text
        } else {
            // Add new task
            const li = document.createElement('li');
            li.textContent = taskText;

            // Create edit button
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'edit';
            editButton.onclick = () => editTask(li, taskText);

            // Create delete button dengan ikon
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>'; // Ganti tombol delete dengan ikon
            deleteButton.onclick = () => deleteTask(li);

            li.appendChild(editButton);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        }

        taskInput.value = ''; // Clear input field
    }
}

// Event listener untuk tombol "Add"
addTaskButton.addEventListener('click', addTask);

// Event listener untuk menekan tombol "Enter"
taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask(); // Panggil fungsi addTask saat Enter ditekan
    }
});

// Fungsi untuk mengedit task
function editTask(taskItem, taskText) {
    taskInput.value = taskText; // Set input to the current task text
    editingTaskIndex = Array.from(taskList.children).indexOf(taskItem); // Get index of the task
    addTaskButton.innerHTML = '<i class="fa-solid fa-user-plus"></i>'; // Change button text
}

// Fungsi untuk menghapus task
function deleteTask(taskItem) {
    taskList.removeChild(taskItem);
}
