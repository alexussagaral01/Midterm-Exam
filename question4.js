let tasks = [];
let nextId = 1;

// Function to add a new task
function addTask(name, description) {
    if (!name || typeof name !== 'string') {
        throw new Error('Task name is required and must be a string');
    }
    const task = {
        id: nextId++,
        name,
        description: description || ''
    };
    tasks.push(task);
    return task;
}

// Function to find a task by id
function findTask(id) {
    return tasks.find(task => task.id === id);
}

// Function to view all tasks
function viewTasks() {
    return [...tasks];
}

// Function to update a task
function updateTask(id, newName, newDescription) {
    const task = findTask(id);
    if (!task) {
        throw new Error('Task not found');
    }
    if (newName && typeof newName === 'string') {
        task.name = newName;
    }
    if (newDescription !== undefined) {
        task.description = newDescription;
    }
    return task;
}

// Function to delete a task
function deleteTask(id) {
    const initialLength = tasks.length;
    tasks = tasks.filter(task => task.id !== id);
    return initialLength !== tasks.length;
}

// Example usage
try {
    const task1 = addTask('Task 1', 'Description 1');
    const task2 = addTask('Task 2', 'Description 2');
    console.log('All tasks:', viewTasks());
    
    updateTask(task1.id, 'Updated Task 1', 'Updated Description');
    console.log('After update:', viewTasks());
    
    deleteTask(task2.id);
    console.log('After delete:', viewTasks());
} catch (error) {
    console.error('Error:', error.message);
}
