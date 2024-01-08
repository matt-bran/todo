import { taskList } from "./task";
import { format } from "date-fns";
import { isEqual } from "date-fns";

const menu_list = document.getElementById('menu-list');
const content_h_title = document.getElementById('content-header-title');
const overlay = document.getElementById('overlay');
const add_task_btn = document.getElementById('add-task');
const close_btn = document.getElementById('close-btn');
const form = document.getElementById('new-task-form');
const ul_tasks = document.getElementById('tasks');
const add_list = document.getElementById('add-list');
const new_list_form = document.getElementById('new-list-form')
const cancel_list = document.getElementById('cancel-list');


//let lists_container = [];
let lists_container = {};

if (window.localStorage.length == 0){
    init();
} else {
    fetchData();
}

function init() {
    console.log("init does nothing");
}

new_list_form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(new_list_form);
    const new_list_title = formData.get("new-list-title");
    lists_container[new_list_title] = taskList(new_list_title);
    add_list.classList.remove('hidden');
    new_list_form.classList.add('hidden');
    const menu_li = document.createElement('li');
    menu_li.textContent = new_list_title;
    menu_list.append(menu_li);
});

add_list.addEventListener('click', () => {
    add_list.classList.add('hidden');
    add_list.nextElementSibling.classList.remove('hidden');
});

cancel_list.addEventListener('click', () => {
    cancel_list.parentElement.parentElement.previousElementSibling.classList.remove('hidden');
    cancel_list.parentElement.parentElement.classList.add('hidden');
});

add_task_btn.addEventListener('click', () => {
    overlay.style.display = "block";
});

close_btn.addEventListener('click', () => {
    overlay.style.display = "none";
});

menu_list.addEventListener('click', (e) => {
    if (e.target && e.target.matches('li')) {
        refreshDOMList(lists_container[e.target.textContent]);
        //menu_list.children.forEach((node) => node.classList.remove('active'));
        Array.from(menu_list.children).forEach((node) => node.classList.remove('active'));
        e.target.classList.add('active');
    }
});

ul_tasks.addEventListener('click', (e) => {
    if (e.target && e.target.matches("span.expand")) {
        const btm_desc = e.target.parentNode.parentNode.parentNode.children.item(1);
        if (btm_desc.textContent == "No description available...") {
            btm_desc.style.color = "#888";
            btm_desc.style.fontStyle = "italic";
        }
        if (e.target.classList.contains('open')){
            e.target.classList.remove('open');
            btm_desc.classList.add('hidden');
        } else {
            btm_desc.classList.remove('hidden');
            e.target.classList.add('open');
        }
    }
});


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const input_title = formData.get("title");
    const input_date = formData.get("duedate");
    const input_priority = formData.get("priority");
    let input_desc = formData.get("desc");
    if (input_desc == "") {
        input_desc = "No description available...";
    }
    const list_title = document.querySelector('.active').textContent;
    lists_container[list_title].insert(input_title, input_desc, input_date, input_priority);
    refreshDOMList(lists_container[list_title]);
    form.reset();
    overlay.style.display = "none";
});

function refreshDOMList(list) {
    ul_tasks.innerHTML = '';
    content_h_title.textContent = list.getTitle();
    for (let i = 0; i < list.getSize(); i++) {
        
        const li = document.createElement('li');
        li.classList.add('item');
        
        const p_title = document.createElement('p');
        p_title.textContent = list.getElementAt(i).getTitle();

        const task_right = document.createElement('div');
        const task_left = document.createElement('div');
        task_right.classList.add('task-right');
        task_left.classList.add('task-left');

        const p_date = document.createElement('p');
        p_date.classList.add('task-date');
        const date = list.getElementAt(i).getDueDate();
        if (!isEqual(date, new Date(0))) {
            p_date.textContent = "due " + format(date, 'MM/dd/yyyy');
            task_right.appendChild(p_date);
        }
        const priority = list.getElementAt(i).getPriority();
        const priority_p = document.createElement('p');
        switch (priority) {
            case 0: 
                priority_p.style.color = "#888";
                priority_p.textContent = 'Low';
                break;
            case 1: 
                priority_p.style.color = "#0baeb9";
                priority_p.textContent = 'Medium';
                break;
            case 2: 
                priority_p.style.color = "#b84646";
                priority_p.textContent = 'High';
                break;
        }
        const svg_sq = document.createElement('span');
        svg_sq.classList.add("material-symbols-outlined");
        svg_sq.classList.add("square");
        svg_sq.textContent = "edit_square";

        const svg_expand = document.createElement('span');
        svg_expand.classList.add("material-symbols-outlined");
        svg_expand.classList.add("expand");
        svg_expand.textContent = "expand_more";

        const desc = document.createElement('p');
        desc.classList.add('hidden');
        desc.classList.add('desc');
        desc.textContent = list.getElementAt(i).getDescription();

        const li_top = document.createElement('div');
        li_top.classList.add('li-top');
        

        task_left.appendChild(svg_expand);
        task_left.appendChild(p_title);
        task_right.appendChild(priority_p);
        task_right.appendChild(svg_sq);
        li_top.appendChild(task_left);
        li_top.appendChild(task_right);
        li.appendChild(li_top);
        li.appendChild(desc);

        ul_tasks.appendChild(li);
    }
}

