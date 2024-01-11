import { domController } from "./domController";

export const menuEventHandlers = {
    handleOpenNewProjForm: () => {
        document.getElementById('add-list').addEventListener('click', (e) => { 
            domController.showAddListForm() 
        });
    },

    handleCancelNewProjectForm: () => {
        document.getElementById('cancel-list').addEventListener('click', (e) => { 
            domController.hideAddListForm(); 
        });
    },

    handleSubmitNewProjectForm: () => {
        document.getElementById('new-list-form').addEventListener('submit', (e) => {
            e.preventDefault();
            domController.updateListMenu(e.target);
        });
    },

    handleClickProject: () => {
        document.getElementById('menu-list').addEventListener('click', (e) => {
            if (e.target && e.target.matches('li')) {
                domController.updateActiveProject(e.target);
                domController.refreshTaskContent();
            }
        });
    }
};

export const listContentEventHandlers = {
    handleOpenNewTaskForm: () => {
        document.getElementById('add-task').addEventListener('click', () => { 
            domController.showAddTaskOverlay();
        });
    },
    handleCloseNewTaskForm: () => {
        document.getElementById('close-btn').addEventListener('click', () => { 
            domController.hideOverlay(); 
        });
    },
    handleSubmitNewTaskForm: () => {
        document.getElementById('new-task-form').addEventListener('submit', (e) => {
            e.preventDefault();
            domController.submitOverlay(e.target);
            domController.refreshTaskContent();
            domController.hideOverlay();
        });
    },
    handleClearTasks: () => {
        document.getElementById('clear-tasks').addEventListener('click', () => {
            domController.clearCompletedTasks();
            domController.refreshTaskContent();
        });
    },
    handleClickTask: () => {
        document.getElementById('tasks').addEventListener('click', (e) => {
            // task card
            if (e.target && e.target.matches("li.item")) {
                domController.toggleTaskDesc(e.target);
            }
            // edit task button
            else if (e.target && e.target.matches("span.square")) {
                const task_title = e.target.parentElement.previousSibling.children.item(1);
                domController.showEditTaskOverlay(task_title);
            }
            // delete task button
            else if (e.target && e.target.matches("span.delete")) {
                const task_title = e.target.parentElement.previousSibling.children.item(1);
                domController.removeTaskFromList(task_title);
                domController.refreshTaskContent();
            }
            // complete task button
            else if (e.target && e.target.matches("span.radio")) {
                domController.toggleTaskCompletion(e.target);
            }
        });
    },
};

