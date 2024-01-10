import { menuEventHandlers, listContentEventHandlers } from "./eventHandlers";

if (window.localStorage.length == 0){
    init();
} else {
    fetchData();
}

function init() {
    Object.values(menuEventHandlers).forEach(handler => handler());
    Object.values(listContentEventHandlers).forEach(handler => handler());
}

