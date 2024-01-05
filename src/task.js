
const task = (title, description, dueDate, priority) => {
    const task_title = title;
    const task_description = description;
    const task_dueDate = dueDate;
    const task_priority = priority;
    let isComplete = false;

    const getTitle = () => task_title;
    const getDescription = () => task_description; 
    const getDueDate = () => task_dueDate;
    const getPriority = () => task_priority;
    const getisComplete = () => isComplete;
    const toggleisComplete = () => {
        if (isComplete == false) {
            isComplete = true;
        } else {
            isComplete = false;
        }
    };

    return { getTitle, getDescription, getDueDate, getPriority, getisComplete, toggleisComplete }
};

const taskList = (title) => {
    const list_title = title;
    var tasks = [];

    const add = (task_title, description, dueDate, priority) => 
        tasks.push(task(task_title, description, dueDate, priority));
    const remove = (task) => list.remove(task);
    const getTitle = () => list_title;

    return { add, remove, getTitle }
} 

export { taskList }
