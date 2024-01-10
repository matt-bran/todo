const Task = (title, description, dueDate, priority) => {
    let task_title = title;
    let task_description = description;
    let task_dueDate = dueDate;
    let task_priority = priority;
    let isComplete = false;

    const getTitle = () => task_title;
    const getDescription = () => task_description; 
    const getDueDate = () => task_dueDate;
    const getPriority = () => task_priority;
    const getisComplete = () => isComplete;

    const setTitle = (new_title) => { task_title = new_title };
    const setDescription = (new_desc) => { task_description = new_desc }; 
    const setDueDate = (new_date) => { task_dueDate = new_date };
    const setPriority = (new_priority) => { task_priority = new_priority }; 
    const toggleisComplete = () => {
        isComplete = !isComplete;
    };
    return { getTitle, getDescription, getDueDate, getPriority, setTitle, 
             setDescription, setDueDate, setPriority, getisComplete, toggleisComplete }
};
export { Task }
