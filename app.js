const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('tasks-list');

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  list.innerHTML = tasks.map((task, i) =>
    `<li>${task} <button onclick="deleteTask(${i})">Удалить</button></li>`
  ).join('');
}

function addTask(text) {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.push(text);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    addTask(text);
    input.value = '';
  }
});

loadTasks();

// Регистрация Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('sw.js');
      console.log('Service Worker зарегистрирован:', reg.scope);
    } catch (err) {
      console.error('Ошибка регистрации Service Worker:', err);
    }
  });
}
