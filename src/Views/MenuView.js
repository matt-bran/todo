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
        document.getElementById('error').classList.add('hidden');

    }
    function renderProjectsList(form) {
        document.querySelectorAll('li.project').forEach((proj) => proj.remove());
        const query = dataController.readAllProjectTitles();
        for (let i = 0; i < query.length; i++) {
            const menu_li = createDOMElement('li', {class: 'project tab'}, query[i]);
            document.getElementById('menu-list').append(menu_li);
        }
    }
    function SubmitNewProjectForm(form) {
        const formData = new FormData(form);
        const project_title = formData.get("new-project-title");
        const projs = document.querySelectorAll('li.project');
        let isExists = false;
        for (let i = 0; i < projs.length; i++) {
            if (projs.item(i).textContent == project_title) {
                isExists = true;
                break;
            }
        }

        if (!isExists) {
            dataController.createNewProject(project_title);
            hideAddListForm();
            renderProjectsList();
            document.getElementById('error').classList.add('hidden');
        } else {
            document.getElementById('error').classList.remove('hidden');
            play(document.getElementById('error'));
        }
    }
    function play(element) {
        element.classList.remove('animate');
        requestAnimationFrame((time) => {
            requestAnimationFrame((time) => {
                element.classList.add('animate');
            });
        });
    }
    function updateActiveTab(li) {
        const menu_list = document.getElementById('menu-list');
        Array.from(menu_list.children).forEach((node) => node.classList.remove('active'));
        li.classList.add('active'); 
    }
    return { showAddListForm, hideAddListForm, renderProjectsList, SubmitNewProjectForm, updateActiveTab }
})();