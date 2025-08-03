import { useState, useEffect } from "react";
const API_TASKS = import.meta.env.VITE_API_TASKS;

const useTasks = () => {
    const [tasks, setTasks] = useState(null);

    const getTasks = async () => {
        const res = await fetch(API_TASKS);
        const data = await res.json();
        setTasks(data);
    }

    useEffect(() => {
        getTasks();
    }, []);

    const addTask = async (taskObj = {}) => {

        const res = await fetch(API_TASKS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskObj)
        });

        const data = await res.json();
        console.log(data);
        return data;
    }

    const removeTask = async (task) => {
        const res = await fetch(`${API_TASKS}/${task.id}`, {
            method: 'DELETE'
        });
        const data = await res.json();
        return data;
    }

    const updateTask = () => {

    }

    return [tasks, getTasks, addTask, removeTask, updateTask];
}

export default useTasks;