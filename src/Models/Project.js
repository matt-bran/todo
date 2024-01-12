import { Task } from "./Task";

const Project = (title) => {
    const project_title = title;
    var tasks = [];
    // sorted insert by priority
    const insert = (task) => {
        let ins_prior = priorityParser(task.priority);
        let ins_date = new Date(0);
        if (task.dueDate != "") {
            const args = task.dueDate.split('-');
            ins_date = new Date(args[0], parseInt(args[1])-1, args[2]);
        }
        if (tasks.length == 0) {
            tasks.push(Task(task.title, task.desc, ins_date, task.priority));
            return;
        }
        for (let i = 0; i < tasks.length; i++) {
            let temp_prior = priorityParser(tasks[i].getPriority());
            if (ins_prior > temp_prior) {
                tasks.splice(i, 0, Task(task.title, task.desc, ins_date, task.priority));
                return;
            } 
            else {
                if (i == tasks.length-1) {
                    tasks.push(Task(task.title, task.desc, ins_date, task.priority));
                    return;
                }
                else if (ins_prior > priorityParser(tasks[i+1].getPriority)) {
                    tasks.splice(i+1, 0, Task(task.title, task.desc, ins_date, task.priority));
                    return;
                }
            } 
        }
    };

    const remove = (task_title) => {
        const index = getElementIndexByTitle(task_title);
        tasks.splice(index, 1);
    };

    const priorityParser = (str) => {
        const LOW = 0, MED = 1, HIGH = 2;
        switch (str) {
            case 'low': return LOW;
            case 'medium': return MED;
            case 'high': return HIGH;
        }
    };


    const getTitle = () => project_title;

    const getElementAt = (index) => tasks[index];

    const getElementIndexByTitle = (target_title) => {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].getTitle() == target_title) {
                return i;
            }
        }
        return -1;
    };

    const getSize = () => tasks.length;

    return { insert, remove, getTitle, 
            getElementAt, getElementIndexByTitle, getSize}
} 
export { Project }