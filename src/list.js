
const taskList = () => {
    var list = [];

    const add = (task) => list.add(task);
    const remove = (task) => list.remove(task);
    const getElementAt = (pos) => list.getElementAt(pos); 

    return { add, remove, getElementAt }
} 

export { taskList }