import { isEqual } from "date-fns";

const task = (title, description, dueDate, priority) => {
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

const taskList = (title) => {
    const list_title = title;
    var tasks = [];

    // sorted insert by priority
    const insert = (task_title, description, dueDate, priority) => {
        let ins_prior = priorityParser(priority);
        let ins_date = new Date(0);
        if (dueDate != "") {
            const args = dueDate.split('-');
            ins_date = new Date(args[0], args[1], args[2]);
        }
        if (tasks.length == 0) {
            tasks.push(task(task_title, description, ins_date, priority));
            return;
        }
        for (let i = 0; i < tasks.length; i++) {
            let temp_prior = priorityParser(tasks[i].getPriority());
            if (ins_prior > temp_prior) {
                tasks.splice(i, 0, task(task_title, description, ins_date, priority));
                return;
            } 
            else {
                if (i == tasks.length-1) {
                    tasks.push(task(task_title, description, ins_date, priority));
                    return;
                }
                else if (ins_prior > priorityParser(tasks[i+1].getPriority)) {
                    tasks.splice(i+1, 0, task(task_title, description, ins_date, priority));
                    return;
                }
            } 
        }
    };

    const priorityParser = (str) => {
        const LOW = 0, MED = 1, HIGH = 2;
        switch (str) {
            case 'low': return LOW;
            case 'medium': return MED;
            case 'high': return HIGH;
        }
    };

    const remove = (task_title) => {
        const index = getElementIndexByTitle(task_title);
        tasks.splice(index, 1);
    };

    const getTitle = () => list_title;

    const getElementAt = (index) => tasks[index];

    const getElementIndexByTitle = (target_title) => {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].getTitle() == target_title) {
                return i;
            }
        }
        return -1;
    };

    const getIsCompleteAt = (index) => {
        return tasks[index].getisComplete();
    }

    const setTitleAt = (index, new_title) => {
        tasks[index].setTitle(new_title);
    };

    const setDateAt = (index, date) => {
        const args = date.split('-');
        tasks[index].setDueDate(new Date(args[0], args[1], args[2]));
    };

    const setPriorityAt = (index, priority) => {
        tasks[index].setPriority(priority);
    };

    const setDescAt = (index, desc) => {
        tasks[index].setDescription(desc);
    };

    const getSize = () => tasks.length;

    const toggleCompleteAt = (index) => {
        tasks[index].toggleisComplete();
    }

    return { insert, remove, getTitle, 
            getElementAt, getElementIndexByTitle, getSize,
            setTitleAt, setDateAt, setPriorityAt, setDescAt,
            toggleCompleteAt, getIsCompleteAt}
} 
export { taskList }
