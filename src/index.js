import { eventHandlers } from "./eventHandlers";

if (window.localStorage.length == 0){
    init();
} else {
    fetchData();
}

function init() {
    Object.values(eventHandlers).forEach(handler => handler());
}

