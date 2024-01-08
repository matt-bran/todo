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

export function showOverlay() {
    document.getElementById('overlay').style.display = "block";
}

export function closeAndSubmitOverlay(form) {
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
    updateTaskContent(list_title);
    form.reset();
    hideOverlay();
}

export function hideOverlay() {
    document.getElementById('overlay').style.display = "none";
}

export function toggleTaskDesc(expand_icon) {
    const btm_desc = expand_icon.parentNode.parentNode.parentNode.children.item(1);
    if (btm_desc.textContent == "No description available...") {
        btm_desc.style.color = "#888";
        btm_desc.style.fontStyle = "italic";
    }
    if (expand_icon.classList.contains('open')){
        expand_icon.classList.remove('open');
        btm_desc.classList.add('hidden');
    } else {
        btm_desc.classList.remove('hidden');
        expand_icon.classList.add('open');
    }
}

export function updateTaskContent(list_title) {
    const list = lists_container[list_title];
    const ul_tasks = document.getElementById('tasks');
    ul_tasks.innerHTML = '';
    document.getElementById('content-header-title').textContent = list.getTitle();
    for (let i = 0; i < list.getSize(); i++) { 
        const li = createDOMElement('li', { class: 'item'});       
        const li_top = createDOMElement('div', {class: 'li-top'});
        const task_right = createDOMElement('div', {class: "task-right"});
        const task_left = createDOMElement('div', {class: "task-left"});
        const p_title = createDOMElement('p', {}, list.getElementAt(i).getTitle());
        const desc = createDOMElement('p', { class: 'desc hidden' }, list.getElementAt(i).getDescription());
        const svg_sq = createDOMElement('span', { class: "material-symbols-outlined square" }, 'edit_square');
        const svg_expand = createDOMElement('span', { class: "material-symbols-outlined expand" }, 'expand_more');

        const date = list.getElementAt(i).getDueDate();
        if (!isEqual(date, new Date(0))) {
            const date_to_str = "due " + format(date, 'MM/dd/yyyy');
            task_right.appendChild(createDOMElement('p', { class: 'task-date'}, date_to_str));
        }
        const priority = list.getElementAt(i).getPriority();
        const p_priority = createDOMElement('p', { class: priority}, priority)

        task_left.appendChild(svg_expand);
        task_left.appendChild(p_title);
        task_right.appendChild(p_priority);
        task_right.appendChild(svg_sq);
        li_top.appendChild(task_left);
        li_top.appendChild(task_right);
        li.appendChild(li_top);
        li.appendChild(desc);
        ul_tasks.appendChild(li);
    }
}