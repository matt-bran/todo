import { Task } from "./Task";

const Project = (title) => {
    let task_id_generator = -1;
    const project_title = title;
    var tasks = [];
    // sorted insert by priority
    const insert = (title, dueDate, priority, description, isComplete=false) => {
        task_id_generator+=1;
        let ins_prior = priorityParser(priority);
        let ins_date = new Date(0);
        if (dueDate != "") {
            const args = dueDate.split('-');
            ins_date = new Date(args[0], parseInt(args[1])-1, args[2]);
        }
        if (tasks.length == 0) {
            tasks.push(Task(task_id_generator, title, description, ins_date, priority, isComplete));
            return;
        }
        for (let i = 0; i < tasks.length; i++) {
            let temp_prior = priorityParser(tasks[i].getPriority());
            if (ins_prior > temp_prior) {
                tasks.splice(i, 0, Task(task_id_generator, title, description, ins_date, priority, isComplete));
                return;
            } 
            else {
                if (i == tasks.length-1) {
                    tasks.push(Task(task_id_generator, title, description, ins_date, priority, isComplete));
                    return;
                }
                else if (ins_prior > priorityParser(tasks[i+1].getPriority)) {
                    tasks.splice(i+1, 0, Task(task_id_generator, title, description, ins_date, priority, isComplete));
                    return;
                }
            } 
        }
    };

    const remove = (id) => {
        const index = getElementIndexById(id);
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

    const getElementIndexById = (id) => {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].getId() == id) {
                return i;
            }
        }
        return -1;
    };

    const getSize = () => tasks.length;

    const exportData = () => {
        let data = []; 
        for (let i = 0; i < tasks.length; i++) {
            const date = tasks[i].getDueDate();
            data.push({
                title: tasks[i].getTitle(),
                dueDate: `${date.getFullYear()}-${parseInt(date.getMonth())+1}-${date.getDate()}`,
                priority: tasks[i].getPriority(),
                description: tasks[i].getDescription(), 
                isComplete: tasks[i].getisComplete()
            });
        }
        return data;
    }

    return { insert, remove, getTitle, 
            getElementAt, getSize, exportData}
} 
export { Project }