import { dataController } from '../dataController';
import { createDOMElement } from "../utils";

/* Responsible for all DOM manipulation that occurs in the menu */

export const MenuView = (() => {
    function showAddListForm () {
        document.getElementById('add-list').classList.add('hidden');
        document.getElementById('new-list-form').classList.remove('hidden');
    }
    function hideAddListForm () {
        document.getElementById('add-list').classList.remove('hidden');
        document.getElementById('new-list-form').classList.add('hidden');
    }
    function renderProjectsList(form) {
        const query = dataController.readAllProjectTitles();
        for (let i = 0; i < query.length; i++) {
            const menu_li = createDOMElement('li', {class: 'project tab'}, query[i]);
            document.getElementById('menu-list').append(menu_li);
        }
    }
    function SubmitNewProjectForm(form) {
        const formData = new FormData(form);
        const project_title = formData.get("new-project-title");
        dataController.createNewProject(project_title);
    }
    function updateActiveTab(li) {
        const menu_list = document.getElementById('menu-list');
        Array.from(menu_list.children).forEach((node) => node.classList.remove('active'));
        li.classList.add('active'); 
    }
    return { showAddListForm, hideAddListForm, renderProjectsList, SubmitNewProjectForm, updateActiveTab }
})();