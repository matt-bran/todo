import { add, isToday, startOfToday } from 'date-fns';
import { ProjectsContainer } from './ProjectsContainer'


const dataController = (() => {

    function createNewProject(title) {
        ProjectsContainer.createProject(title);
    }

    function createNewTask(project_title, task) {
        const project = ProjectsContainer.getProject(project_title);
        project.insert(task)
    }

    function editTask(project_title, task_title, edits) {
        const project = ProjectsContainer.getProject(project_title);
        for (let i=0; i < project.getSize(); i++) {
            const curr_task = project.getElementAt(i);
            if (task_title == curr_task.getTitle()) {
                project.getElementAt(i).setTitle(edits.title);
                project.getElementAt(i).setPriority(edits.priority);
                project.getElementAt(i).setDescription(edits.desc);
                if (edits.dueDate == "") {
                    project.getElementAt(i).setDueDate(new Date(0));
                } else {
                    const args = edits.dueDate.split('-');
                    project.getElementAt(i).setDueDate(new Date(args[0], parseInt(args[1])-1, args[2]));
                }
            }
        }
    }
    function readProjectAllTasks(project_title) {
        const project = ProjectsContainer.getProject(project_title);
        let query = [];
        for (let i = 0; i < project.getSize(); i++) {
            const task = project.getElementAt(i);
            let task_contents = {
                title: task.getTitle(),
                dueDate: task.getDueDate(),
                priority: task.getPriority(),
                description: task.getDescription(),
                isComplete: task.getisComplete(), 
                project_title: project_title
            };
            query.push(task_contents);
        }
        return query;
    }
    function readProjectTask(project_title, task_title) {
        const project = ProjectsContainer.getProject(project_title);
        for (let i=0; i < project.getSize(); i++) {
            const curr_task = project.getElementAt(i);
            if (task_title == curr_task.getTitle()) {
                return { title: curr_task.getTitle(), 
                         dueDate: curr_task.getDueDate(), 
                         priority: curr_task.getPriority(),
                         description: curr_task.getDescription(),
                         isComplete: curr_task.getisComplete(),
                         project_title: project_title
                        }
            }
        }
    }
    function deleteProjectTask(project_title, task_title) {
        const project = ProjectsContainer.getProject(project_title);
        for (let i=0; i < project.getSize(); i++) {
            const curr_task = project.getElementAt(i);
            console.log('(deleteProjectTask) title: ' + curr_task.getTitle());
            if (task_title == curr_task.getTitle()) {
                project.remove(task_title);
                return true;
            }
        }
        return false;
    }
    function toggleTask(project_title, task_title) {
        const project = ProjectsContainer.getProject(project_title);
        for (let i=0; i < project.getSize(); i++) {
            const curr_task = project.getElementAt(i);
            if (task_title == curr_task.getTitle()) {
                curr_task.toggleisComplete();
                return true;
            }
        }
        return false;
    }
    function deleteProjectCompleteTasks(project_title) {
        const project = ProjectsContainer.getProject(project_title);
        console.log('List size before deletion: ' + project.getSize());
        for (let i=project.getSize()-1; i >= 0; i--) {
            if (project.getElementAt(i).getisComplete()) {
                const title = project.getElementAt(i).getTitle();
                project.remove(title);
            }
        }
    }
    function queryCompleteCount(project_title) {
        const project = ProjectsContainer.getProject(project_title);
        let count = 0;
        for (let i=0; i < project.getSize(); i++) {
            if (project.getElementAt(i).getisComplete()) {
                count+=1;
            }
        }
        return count;
    }

    function queryAllTasksToday() {
        let ret = [];
        for (let i = 0; i < ProjectsContainer.getSize(); i++) {
            const project = ProjectsContainer.getProjectByIndex(i);
            for (let j = 0; j < project.getSize(); j++) {
                const task = project.getElementAt(j);
                if (isToday(task.getDueDate())) {
                    ret.push({
                        project_title: project.getTitle(),
                        title: task.getTitle(),
                        dueDate: task.getDueDate(),
                        priority: task.getPriority(), 
                        description: task.getDescription()
                    });
                }
            }
        }
        return ret;
    } 

    function queryAllTasksWeek() {
        let ret = [];
        for (let i = 0; i < ProjectsContainer.getSize(); i++) {
            const project = ProjectsContainer.getProjectByIndex(i);
            for (let j = 0; j < project.getSize(); j++) {
                const task = project.getElementAt(j);
                const task_date = task.getDueDate().getTime();
                if (task_date >= startOfToday().getTime() && task_date <= add(Date.now(), {weeks: 1}).getTime()) {
                    ret.push({
                        project_title: project.getTitle(),
                        title: task.getTitle(),
                        dueDate: task.getDueDate(),
                        priority: task.getPriority(), 
                        description: task.getDescription()
                    });
                }
            }
        }
        return ret;
    } 

    function queryAllTasksByCompletion(isComplete) {
        let ret = [];
        for (let i = 0; i < ProjectsContainer.getSize(); i++) {
            const project = ProjectsContainer.getProjectByIndex(i);
            for (let j = 0; j < project.getSize(); j++) {
                const task = project.getElementAt(j);
                if (isComplete == task.getisComplete()) {
                    ret.push({
                        project_title: project.getTitle(),
                        title: task.getTitle(),
                        dueDate: task.getDueDate(),
                        priority: task.getPriority(), 
                        description: task.getDescription(), 
                        isComplete: task.getisComplete()
                    });
                }
            }
        }
        return ret;
    }

    function queryAllTasksByPriority(priority) {
        let ret = [];
        for (let i = 0; i < ProjectsContainer.getSize(); i++) {
            const project = ProjectsContainer.getProjectByIndex(i);
            for (let j = 0; j < project.getSize(); j++) {
                const task = project.getElementAt(j);
                console.log('(queryAllTasksByPriority) task title: ' + task.getTitle());
                if (priority == task.getPriority()) {
                    ret.push({
                        project_title: project.getTitle(),
                        title: task.getTitle(),
                        dueDate: task.getDueDate(),
                        priority: task.getPriority(), 
                        description: task.getDescription(), 
                        isComplete: task.getisComplete()
                    });
                }
            }
        }
        return ret;
    }

    return { createNewProject, createNewTask, editTask, 
            readProjectAllTasks, readProjectTask, deleteProjectTask, 
            toggleTask, queryCompleteCount, deleteProjectCompleteTasks,
            queryAllTasksByCompletion, queryAllTasksByPriority, queryAllTasksToday, queryAllTasksWeek }
})();

export { dataController }