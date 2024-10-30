let tasks = [];

document.getElementById('newTask').addEventListener('click', function (e) {
  e.preventDefault();
  addTask();
});

const addTask = () => {
  const taskInput = document.getElementById('textinput');
  const text = taskInput.value.trim();

  if (text) {
    tasks.push({ text, completed: false });
    taskInput.value = "";
    updateTasksList();
  }
};

const updateTasksList = () => {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('task-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTaskCompletion(index));

    const taskText = document.createElement('p');
    taskText.textContent = task.text;
    taskText.classList.add('task-text');
    if (task.completed) taskText.classList.add('completed');

    const editBtn = document.createElement('img');
    editBtn.src = 'https://cdn-icons-png.flaticon.com/128/9283/9283120.png';
    editBtn.classList.add('edit-icon');
    editBtn.alt = "Edit task";
    editBtn.addEventListener('click', () => editTask(index));

    const deleteBtn = document.createElement('img');
    deleteBtn.src = 'https://cdn-icons-png.flaticon.com/128/9210/9210462.png';
    deleteBtn.classList.add('delete-icon');
    deleteBtn.alt = "Delete task";
    deleteBtn.addEventListener('click', () => deleteTask(index));

    listItem.append(checkbox, taskText, editBtn, deleteBtn);
    taskList.appendChild(listItem);
  });

  updateStats();
};

const toggleTaskCompletion = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTasksList();
  if (tasks[index].completed) showToast('Task completed! 🎉');
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
};

const editTask = (index) => {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim();
    updateTasksList();
  }
};

const updateStats = () => {
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = (totalTasks === 0) ? 0 : (completedTasks / totalTasks) * 100;

  document.getElementById('numbers').textContent = `${completedTasks}/${totalTasks}`;
  document.getElementById('progress').style.width = `${progress}%`;

  if (completedTasks === totalTasks && totalTasks > 0) launchConfetti();
};

const showToast = (message) => {
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    toast.addEventListener('transitionend', () => toast.remove());
  }, 2000);
};

const launchConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
};
