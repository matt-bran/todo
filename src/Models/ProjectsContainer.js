import { Project } from "./Project";

const ProjectsContainer = (() => {
    let projects = [];

    const createProject = (title) => {
        projects.push(Project(title));
    }

    const getProjectByIndex = (index) => {
        return projects[index];
    }

    const remove = (title) => {
        for (let i=0; i < projects.length; i++) {
            if (projects[i].getTitle() == title) {
                projects.splice(i, 1); 
            }
        }
    }

    const getProject = (title) => {
        for (let i=0; i < projects.length; i++) {
            if (projects[i].getTitle() == title) {
                return projects[i]; 
            }
        }
    }

    const getSize = () => { 
        return projects.length;
    }

    return { createProject, getProjectByIndex, getProject, getSize, remove }
})();

export { ProjectsContainer }