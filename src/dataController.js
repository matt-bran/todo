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
                    project.getElementAt(i).setDueDate(new Date(args[0], args[1], args[2]));
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
                name: task.getTitle(),
                dueDate: task.getDueDate(),
                priority: task.getPriority(),
                description: task.getDescription(),
                isComplete: task.getisComplete()
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
                         isComplete: curr_task.getisComplete()
                        }
            }
        }
    }
    function deleteProjectTask(project_title, task_title) {
        const project = ProjectsContainer.getProject(project_title);
        for (let i=0; i < project.getSize(); i++) {
            const curr_task = project.getElementAt(i);
            if (task_title == curr_task.getTitle()) {
                project.remove(i);
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

    return { createNewProject, createNewTask, editTask, 
            readProjectAllTasks, readProjectTask, deleteProjectTask, 
            toggleTask, queryCompleteCount, deleteProjectCompleteTasks }
})();

export { dataController }