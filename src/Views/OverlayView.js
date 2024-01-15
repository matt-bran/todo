import { dataController } from '../dataController';
import { isEqual, startOfDay } from "date-fns";

/* Responsible for performing DOM manipulation on all elements that relating to the create/edit task overlay */

export const OverlayView = (() => {
    function showAddTaskOverlay() {
        document.getElementById('overlay').style.display = "block";
        document.querySelector('#overlay-content form legend').textContent = 'New task';
        document.getElementById('submit-btn').textContent = 'Create task';
    }
    function showEditTaskOverlay(li) {
        const query_res = dataController.readProjectTask(li.data.project_title, li.data.task_id);
        document.getElementById('overlay').style.display = "block";
        document.querySelector('#overlay-content form legend').textContent = 'Edit task';
        document.getElementById('submit-btn').textContent = 'Save changes';
        document.querySelector('input#edit-form-proj-title').value = query_res.project_title;
        document.querySelector('input#task-id').value = query_res.id;
        document.querySelector('input#title').value = query_res.title;
        document.querySelector('select#priority').value = query_res.priority;
        document.querySelector('textarea#desc').value = query_res.description;
        if (!isEqual(startOfDay(query_res.dueDate), startOfDay(new Date(0)))){
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
        const task = { title: input_title, dueDate: input_date, priority: input_priority, description: input_desc };
        if (document.querySelector('#overlay-content form legend').textContent == 'New task') {
            const project_title = document.querySelector('.active').textContent;
            dataController.createNewTask(project_title, task);
        }   
        else {
            const task_id = formData.get("task-id");
            const project_title = formData.get("project-title");
            dataController.editTask(project_title, task_id, task);
        }
        form.reset();
    }
    return { showAddTaskOverlay, showEditTaskOverlay, hideOverlay, submitOverlay }
})();