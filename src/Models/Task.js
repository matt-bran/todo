const Task = (newTitle, newDesc, newDate, newPriority, newisComplete) => {
    let title = newTitle;
    let description = newDesc;
    let dueDate = newDate;
    let priority = newPriority;
    let isComplete = newisComplete;

    const getTitle = () => title;
    const getDescription = () => description; 
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const getisComplete = () => isComplete;

    const setTitle = (newTitle) => { title = newTitle };
    const setDescription = (newDesc) => { description = newDesc }; 
    const setDueDate = (newDate) => { dueDate = newDate };
    const setPriority = (newPriority) => { priority = newPriority }; 
    const toggleisComplete = () => { isComplete = !isComplete; };
    
    return { getTitle, getDescription, getDueDate, getPriority, setTitle, 
             setDescription, setDueDate, setPriority, getisComplete, toggleisComplete }
};
export { Task }
