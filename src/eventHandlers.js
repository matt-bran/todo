import { hideAddListForm, showAddListForm, removeTaskFromList, showAddTaskOverlay, showEditTaskOverlay,
        updateListMenu, updateTaskContent, updateActiveMenuListItem, hideOverlay, 
        closeAndSubmitOverlay, toggleTaskDesc } from "./domManipulation";

export const eventHandlers = {
    handleAddList: () => {
        const add_list = document.getElementById('add-list');
        add_list.addEventListener('click', () => { 
            showAddListForm(add_list) 
        });
    },
    handleSubmitNewListForm: () => {
        document.getElementById('new-list-form').addEventListener('submit', (e) => {
            e.preventDefault();
            updateListMenu(e.target);
        });
    },
    handleCancelNewListForm: () => {
        const cancel_list = document.getElementById('cancel-list');
        cancel_list.addEventListener('click', () => { 
            hideAddListForm(cancel_list) 
        });
    },
    handleMenuListEvents: () => {
        const menu_list = document.getElementById('menu-list');
        menu_list.addEventListener('click', (e) => {
            if (e.target && e.target.matches('li')) {
                updateTaskContent(e.target.textContent);
                updateActiveMenuListItem(menu_list, e.target);
            }
        });
    },
    handleAddNewTaskEvent: () => {
        document.getElementById('add-task').addEventListener('click', () => { 
            showAddTaskOverlay();
        });
    },
    handleCloseNewTaskEvent: () => {
        document.getElementById('close-btn').addEventListener('click', () => { 
            hideOverlay(); 
        });
    },
    handleSubmitNewTaskEvent: () => {
        const form = document.getElementById('new-task-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            closeAndSubmitOverlay(form);
        });
    },
    handlClickTaskEvents: () => {
        document.getElementById('tasks').addEventListener('click', (e) => {
            if (e.target && e.target.matches("span.expand")) {
                toggleTaskDesc(e.target);
            }
            else if (e.target && e.target.matches("span.square")) {
                const task_title = e.target.parentElement.previousSibling.children.item(1);
                showEditTaskOverlay(task_title);
            }
            else if (e.target && e.target.matches("span.delete")) {
                const task_title = e.target.parentElement.previousSibling.children.item(1);
                removeTaskFromList(task_title);
            }
        });
    },
};

