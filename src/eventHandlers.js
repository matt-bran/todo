import { MenuView } from './Views/MenuView';
import { ContentView } from './Views/ContentView';
import { OverlayView} from './Views/OverlayView';

export const menuEventHandlers = {
    handleOpenNewProjForm: () => {
        document.getElementById('add-list').addEventListener('click', (e) => { 
            MenuView.showAddListForm(); 
        });
    },
    handleCancelNewProjectForm: () => {
        document.getElementById('cancel-list').addEventListener('click', (e) => { 
            MenuView.hideAddListForm();
        });
    },
    handleSubmitNewProjectForm: () => {
        document.getElementById('new-list-form').addEventListener('submit', (e) => {
            e.preventDefault();
            MenuView.updateListMenu(e.target);
        });
    },
    handleClickTab: () => {
        document.getElementById('menu').addEventListener('click', (e) => {
            if (e.target.matches('.project')) {
                MenuView.updateActiveTab(e.target);
                ContentView.refreshTaskContent();
            } 
            else if (e.target.matches('.filter')) {
                MenuView.updateActiveTab(e.target);
                ContentView.refreshTaskContent();        
            }
        });
    }
};

export const listContentEventHandlers = {
    handleOpenNewTaskForm: () => {
        document.getElementById('add-task').addEventListener('click', () => { 
            OverlayView.showAddTaskOverlay();
        });
    },
    handleCloseNewTaskForm: () => {
        document.getElementById('close-btn').addEventListener('click', () => { 
            OverlayView.hideOverlay(); 
        });
    },
    handleSubmitNewTaskForm: () => {
        document.getElementById('new-task-form').addEventListener('submit', (e) => {
            e.preventDefault();
            OverlayView.submitOverlay(e.target);
            ContentView.refreshTaskContent();
            OverlayView.hideOverlay();
        });
    },
    handleClearTasks: () => {
        document.getElementById('clear-tasks').addEventListener('click', () => {
            ContentView.clearCompletedTasks();
            ContentView.refreshTaskContent();
        });
    },
    handleClickTask: () => {
        document.getElementById('tasks').addEventListener('click', (e) => {
            // task card
            if (e.target && e.target.matches("li.item")) {
                ContentView.toggleTaskDesc(e.target);
            }
            // edit task button
            else if (e.target && e.target.matches("span.square")) {
                const li = e.target.closest('li');
                OverlayView.showEditTaskOverlay(li);
            }
            // delete task button
            else if (e.target && e.target.matches("span.delete")) {
                ContentView.removeTaskFromList(e.target.closest('li').data.project_title, e.target.closest('li').data.task_title);
                ContentView.refreshTaskContent();
            }
            // complete task button
            else if (e.target && e.target.matches("span.radio")) {
                ContentView.toggleTaskCompletion(e.target.closest('li'));
            }
        });
    },
};