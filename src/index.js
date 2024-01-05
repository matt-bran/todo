import { taskList } from "./task";

const menu_list = document.getElementById('menu-list');
const content_h_title = document.getElementById('content-header-title');
const overlay = document.getElementById('overlay');
const add_task_btn = document.getElementById('add-task');
const close_btn = document.getElementById('close-btn');
const form = document.getElementById('new-task-form');


let lists_container = [];

if (window.localStorage.length == 0){
    init();
} else {
    fetchData();
}

function init() {
    const task_list = taskList('Uncategorized');
    lists_container.push(task_list);

    const li = document.createElement('li');
    li.classList.add('active');
    li.classList.add('list-item');
    li.textContent = task_list.getTitle();
    content_h_title.textContent = task_list.getTitle();
    menu_list.appendChild(li);
}

add_task_btn.addEventListener('click', () => {
    overlay.style.display = "block";
});

close_btn.addEventListener('click', () => {
    overlay.style.display = "none";
});


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    form.reset();
    overlay.style.display = "none";
});

