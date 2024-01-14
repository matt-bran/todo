import { menuEventHandlers, listContentEventHandlers } from "./eventHandlers";
import { dataController } from "./dataController"
import { MenuView } from "./Views/MenuView";

init();

if (window.localStorage.length > 0) {
    dataController.importProjects();
    MenuView.renderProjectsList();
}

function init() {
    Object.values(menuEventHandlers).forEach(handler => handler());
    Object.values(listContentEventHandlers).forEach(handler => handler());
}

