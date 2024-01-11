import { dataController } from './dataController';
import { createDOMElement } from "./utils";
import { format } from "date-fns";
import { isEqual } from "date-fns";

const domController = (() => {

    function showAddListForm () {
        document.getElementById('add-list').classList.add('hidden');
        document.getElementById('new-list-form').classList.remove('hidden');
    }

    function hideAddListForm () {
        document.getElementById('add-list').classList.remove('hidden');
        document.getElementById('new-list-form').classList.add('hidden');
    }

    function updateListMenu(form) {
        const formData = new FormData(form);
        const project_title = formData.get("new-project-title");
        dataController.createNewProject(project_title);
        document.getElementById('add-list').classList.remove('hidden');
        form.classList.add('hidden');
        const menu_li = createDOMElement('li', {}, project_title);
        document.getElementById('menu-list').append(menu_li);
    }

    function updateActiveProject(li) {
        const menu_list = document.getElementById('menu-list');
        Array.from(menu_list.children).forEach((node) => node.classList.remove('active'));
        li.classList.add('active');  
    }

    function showAddTaskOverlay() {
        document.getElementById('overlay').style.display = "block";
        document.querySelector('#overlay-content form legend').textContent = 'New task';
        document.getElementById('submit-btn').textContent = 'Create task';
    }

    function showEditTaskOverlay(p_title) {
        const project_title = document.querySelector('.active').textContent;
        const query_res = dataController.readProjectTask(project_title, p_title.textContent);
        document.getElementById('overlay').style.display = "block";
        document.querySelector('#overlay-content form legend').textContent = 'Edit task';
        document.getElementById('submit-btn').textContent = 'Save changes';
        document.querySelector('input#unedited-title').value = query_res.title;
        document.querySelector('input#title').value = query_res.title;
        document.querySelector('select#priority').value = query_res.priority;
        document.querySelector('textarea#desc').value = query_res.description;
        if (!isEqual(query_res.dueDate, new Date(0))){
            document.querySelector('input#duedate').valueAsDate = query_res.dueDate;    
        }        
    }

    function hideOverlay() {
        document.getElementById('overlay').style.display = "none";
    }

    function submitOverlay(form) {
        const formData = new FormData(form);
        const input_title = formData.get("title");
        const input_date = formData.get("duedate");
        const input_priority = formData.get("priority");
        const input_desc = formData.get("desc");
        const project_title = document.querySelector('.active').textContent;
        const task = { title: input_title, dueDate: input_date, priority: input_priority, desc: input_desc };
        if (document.querySelector('#overlay-content form legend').textContent == 'New task') {
            dataController.createNewTask(project_title, task);
        }   
        else {
            const unedited_title = formData.get("unedited-title");
            dataController.editTask(project_title, unedited_title, task);
        }
        form.reset();
    }

    function toggleTaskDesc(item) {
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

    function removeTaskFromList(taskItem) {
        //const project_title = document.querySelector('.active').textContent;
        dataController.deleteProjectTask(taskItem.data.project_title, taskItem.data.task_title);
    }  

    function toggleTaskCompletion(radio) {
        const project_title = document.querySelector('.active').textContent;
        const task_title = radio.nextElementSibling.textContent;
        dataController.toggleTask(project_title, task_title);
        const li = radio.parentElement.parentElement.parentElement;
        strikeThroughListItem(li);
        const count = dataController.queryCompleteCount(project_title);
        document.getElementById('task-counter').textContent = count + " completed tasks";
    }


    function clearCompletedTasks() {
        const project_title = document.querySelector('.active').textContent;
        dataController.deleteProjectCompleteTasks(project_title);
    }

    function refreshFilterContent(query_type) {
        let res = [];
        switch (query_type){
            case 'today': 
                res = dataController.queryAllTasksToday(todays_date);
                break;
            case 'complete': 
                res = dataController.queryAllTasksByCompletion(true);
                break;
            case 'incomplete': 
                res = dataController.queryAllTasksByCompletion(false);
                break;
            case 'high': 
                res = dataController.queryAllTasksByPriority('high');
                break;
            case 'medium': 
                res = dataController.queryAllTasksByPriority('medium');
                break;
            case 'low': 
                res = dataController.queryAllTasksByPriority('low');
                break;
        }
        const ul_tasks = document.getElementById('tasks');
        ul_tasks.innerHTML = '';
        res.forEach((task) => {
            const li_task = createLIHelper(task);
            strikeThroughListItem(li_task);
            ul_tasks.appendChild(li_task);
        });
    }

    function refreshTaskContent() { 
        const project_title = document.querySelector('.active').textContent;
        const ul_tasks = document.getElementById('tasks');
        ul_tasks.innerHTML = '';
        const query_res = dataController.readProjectAllTasks(project_title);
        query_res.forEach((task) => {
            const li_task = createLIHelper(task);
            strikeThroughListItem(li_task);
            ul_tasks.appendChild(li_task);
        })
        const count = dataController.queryCompleteCount(project_title);
        document.getElementById('task-counter').textContent = count + " completed tasks";
        document.getElementById('list-content').classList.remove('hidden');
        document.getElementById('content-header-title').textContent = project_title;
    }

    function strikeThroughListItem(li) {
        const radio = li.children.item(0).children.item(0).children.item(0);        
        const li_top = li.children.item(0); 

        const project_title = li.data.project_title;
        const task_title = li.data.task_title;
        const task = dataController.readProjectTask(project_title, task_title);

        if (task.isComplete) {
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

    /* takes project title and task object and outputs a list item */
    function createLIHelper(task) {
        const li = createDOMElement('li', { class: 'item'});       
        const li_top = createDOMElement('div', {class: 'li-top'});
        const task_right = createDOMElement('div', {class: "task-right"});
        const task_left = createDOMElement('div', {class: "task-left"});
        const p_title = createDOMElement('p', {}, task.title);
        const desc = createDOMElement('p', { class: 'desc hidden' }, task.description);
        const svg_sq = createDOMElement('span', { class: "material-symbols-outlined square" }, 'edit_square');
        const svg_del = createDOMElement('span', { class: "material-symbols-outlined delete" }, 'delete');
        const svg_radio_unchecked = createDOMElement('span', { class: "material-symbols-outlined radio" }, 'radio_button_unchecked');
        const date = task.dueDate;
        if (!isEqual(date, new Date(0))) {
            const date_to_str = "due " + format(date, 'MM/dd/yyyy');
            task_right.appendChild(createDOMElement('p', { class: 'task-date'}, date_to_str));
        }
        const priority = task.priority;
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
        li.data = { project_title: task.project_title, task_title: task.title }
        //console.log(li.data);
        return li;
    }
    return { showAddListForm, updateListMenu, hideAddListForm, updateActiveProject, 
            refreshTaskContent, showAddTaskOverlay, showEditTaskOverlay, hideOverlay,
            submitOverlay, toggleTaskDesc, removeTaskFromList, toggleTaskCompletion, strikeThroughListItem, 
            clearCompletedTasks, refreshFilterContent }
})();

export { domController }