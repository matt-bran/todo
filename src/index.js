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

ul_tasks.addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target && e.target.matches("span.expand")) {
        const btm_desc = e.target.parentNode.parentNode.parentNode.children.item(1);
        if (btm_desc.textContent == "No description available...") {
            btm_desc.style.color = "#888";
        }
        if (e.target.classList.contains('open')){
            e.target.classList.remove('open');
            e.target.parentNode.parentNode.parentNode.children.item(1).classList.add('hidden-desc');
        } else {
            e.target.parentNode.parentNode.parentNode.children.item(1).classList.remove('hidden-desc');
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
    for (let i = 0; i < lists_container.length; i++) {
        if (lists_container[i].getTitle() == list_title) {
            lists_container[i].insert(input_title, input_desc, input_date, input_priority);
            refreshDOMList(lists_container[i]);
        }
    }
    form.reset();
    overlay.style.display = "none";
});

function refreshDOMList(list) {
    ul_tasks.innerHTML = '';
    for (let i = 0; i < list.getSize(); i++) {
        const li = document.createElement('li');
        li.classList.add('item');
        
        const p_title = document.createElement('p');
        const text = list.getElementAt(i).getTitle();
        p_title.textContent = text;

        const task_right = document.createElement('div');
        task_right.classList.add('task-right');
        const task_left = document.createElement('div');
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
        desc.classList.add('hidden-desc');
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

