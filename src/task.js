import { isEqual } from "date-fns";

const LOW = 0;
const MED = 1;
const HIGH = 2;


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

    // sorted insert by priority
    const insert = (task_title, description, dueDate, priority) => {
        let ins_prior = -1;
        let ins_date = new Date(0);
        if (dueDate != "") {
            const args = dueDate.split('-')
            ins_date = new Date(args[0], args[1], args[2]);
        }
        console.log(priority);
        switch (priority) {
            case 'low': 
                ins_prior = LOW;
                break;
            case 'medium': 
                ins_prior = MED;
                break;
            case 'high': 
                ins_prior = HIGH;
        }
        if (tasks.length == 0) {
            tasks.push(task(task_title, description, ins_date, ins_prior));
            return;
        }
        for (let i = 0; i < tasks.length; i++) {
            let temp_prior = tasks[i].getPriority();
            if (ins_prior > temp_prior) {
                tasks.splice(i, 0, task(task_title, description, ins_date, ins_prior));
                return;
            } 
            else {
                if (i == tasks.length-1) {
                    tasks.push(task(task_title, description, ins_date, ins_prior));
                    return;
                }
                else if (ins_prior > tasks[i+1].getPriority) {
                    tasks.splice(i+1, 0, task(task_title, description, ins_date, ins_prior));
                    return;
                }
            } 
        }
    };

    const remove = (task) => list.remove(task);

    const getTitle = () => list_title;

    const getElementAt = (index) => tasks[index];

    const getSize = () => tasks.length;
    

    return { insert, remove, getTitle, getElementAt, getSize }
} 

export { taskList }
