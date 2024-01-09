import { taskList } from "./task";
import { format } from "date-fns";
import { isEqual } from "date-fns";
import { createDOMElement } from "./utils";

let lists_container = {};

export function showAddListForm (add_list) {
    add_list.classList.add('hidden');
    add_list.nextElementSibling.classList.remove('hidden');
}

export function updateListMenu(form) {
    const formData = new FormData(form);
    const new_list_title = formData.get("new-list-title");
    lists_container[new_list_title] = taskList(new_list_title);
    document.getElementById('add-list').classList.remove('hidden');
    form.classList.add('hidden');
    const menu_li = createDOMElement('li', {}, new_list_title);
    document.getElementById('menu-list').append(menu_li);
}

export function hideAddListForm (cancel_list) {
    cancel_list.parentElement.parentElement.previousElementSibling.classList.remove('hidden');
    cancel_list.parentElement.parentElement.classList.add('hidden');
}

export function updateActiveMenuListItem(menu_list, active_li) {
    Array.from(menu_list.children).forEach((node) => node.classList.remove('active'));
    active_li.classList.add('active');
}

export function showAddTaskOverlay() {
    document.getElementById('overlay').style.display = "block";
    document.querySelector('#overlay-content form legend').textContent = 'New task';
    document.getElementById('submit-btn').textContent = 'Create task';

}

export function showEditTaskOverlay(task_title) {
    const list_title = document.querySelector('.active').textContent;
    document.getElementById('overlay').style.display = "block";
    document.querySelector('#overlay-content form legend').textContent = 'Edit task';
    document.getElementById('submit-btn').textContent = 'Save changes';
    const list = lists_container[list_title];;
    for (let i = 0; i < list.getSize(); i++) {
        const task = list.getElementAt(i);
        if (task.getTitle() == task_title.textContent) {
            document.querySelector('input#unedited-title').value = task.getTitle();
            document.querySelector('input#title').value = task.getTitle();
            document.querySelector('input#duedate').valueAsDate = task.getDueDate()
            document.querySelector('select#priority').value = task.getPriority();
            document.querySelector('textarea#desc').value = task.getDescription();
        }
    }
}

export function hideOverlay() {
    document.getElementById('overlay').style.display = "none";
}

export function closeAndSubmitOverlay(form) {
    const formData = new FormData(form);
    const input_title = formData.get("title");
    const input_date = formData.get("duedate");
    const input_priority = formData.get("priority");
    const input_desc = formData.get("desc");
    
    const list_title = document.querySelector('.active').textContent;
    const list = lists_container[list_title];
    if (document.querySelector('#overlay-content form legend').textContent == 'New task') {
        list.insert(input_title, input_desc, input_date, input_priority);
    }   
    else {
        const unedited_title = formData.get("unedited-title");
        const index = list.getElementIndexByTitle(unedited_title);
        list.setTitleAt(index, input_title);
        list.setDateAt(index, input_date);
        list.setPriorityAt(index, input_priority);
        list.setDescAt(index, input_desc);
    }
    updateTaskContent(list_title);
    form.reset();
    hideOverlay();
}

export function toggleTaskDesc(item) {
    const btm_desc = item.children.item(1);
    if (btm_desc.textContent == "") {
        btm_desc.textContent = "No description available...";
        btm_desc.style.color = "#888";
        btm_desc.style.fontStyle = "italic";
    }
    if (item.classList.contains('open')){
        item.classList.remove('open');
        btm_desc.classList.add('hidden');
    } else {
        btm_desc.classList.remove('hidden');
        item.classList.add('open');
    }
}

export function updateTaskContent(list_title) {
    const list = lists_container[list_title];
    const ul_tasks = document.getElementById('tasks');
    ul_tasks.innerHTML = '';
    document.getElementById('content-header-title').textContent = list.getTitle();
    for (let i = 0; i < list.getSize(); i++) { 
        const li = createListItem(list.getElementAt(i));
        strikeThroughListItem(li);
        ul_tasks.appendChild(li);
    }
    document.getElementById('list-content').classList.remove('hidden');
}

export function removeTaskFromList(task_title) {
    const list_title = document.querySelector('.active').textContent;
    lists_container[list_title].remove(task_title);
    updateTaskContent(list_title);
}

export function toggleTaskCompletion(radio) {
    const list_title = document.querySelector('.active').textContent;
    const list = lists_container[list_title];
    const title = radio.nextElementSibling.textContent;
    const index = list.getElementIndexByTitle(title);
    list.toggleCompleteAt(index);
    const li = radio.parentElement.parentElement.parentElement;
    strikeThroughListItem(li);
}

function strikeThroughListItem(li) {
    const list_title = document.querySelector('.active').textContent;
    const list = lists_container[list_title];
    const radio = li.children.item(0).children.item(0).children.item(0);
    const title = radio.nextElementSibling.textContent;
    const index = list.getElementIndexByTitle(title);
    const li_top = li.children.item(0); 
    const isComplete = list.getIsCompleteAt(index);
    if (isComplete) {
        li_top.classList.add('strikethrough');
        radio.innerHTML = 'radio_button_checked';
        const desc = li_top.nextElementSibling;
        if (desc.textContent != "No description available..." && desc.textContent != "") {
        desc.style.textDecoration = "line-through";
        }
    } else {
        li_top.classList.remove('strikethrough');
        radio.innerHTML = 'radio_button_unchecked';
        const desc = li_top.nextElementSibling;
        desc.style.textDecoration = "none";
    }
}

function createListItem(task) {
    const li = createDOMElement('li', { class: 'item'});       
    const li_top = createDOMElement('div', {class: 'li-top'});
    const task_right = createDOMElement('div', {class: "task-right"});
    const task_left = createDOMElement('div', {class: "task-left"});
    const p_title = createDOMElement('p', {}, task.getTitle());
    const desc = createDOMElement('p', { class: 'desc hidden' }, task.getDescription());
    const svg_sq = createDOMElement('span', { class: "material-symbols-outlined square" }, 'edit_square');
    const svg_del = createDOMElement('span', { class: "material-symbols-outlined delete" }, 'delete');
    const svg_radio_unchecked = createDOMElement('span', { class: "material-symbols-outlined radio" }, 'radio_button_unchecked');
    const date = task.getDueDate();
    if (!isEqual(date, new Date(0))) {
        const date_to_str = "due " + format(date, 'MM/dd/yyyy');
        task_right.appendChild(createDOMElement('p', { class: 'task-date'}, date_to_str));
    }
    const priority = task.getPriority();
    const p_priority = createDOMElement('p', { class: priority}, priority)
    task_left.appendChild(svg_radio_unchecked);
    task_left.appendChild(p_title);
    task_right.appendChild(p_priority);
    task_right.appendChild(svg_sq);
    task_right.appendChild(svg_del);
    li_top.appendChild(task_left);
    li_top.appendChild(task_right);
    li.appendChild(li_top);
    li.appendChild(desc);
    return li;
}