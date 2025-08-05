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

    const addTask = async (task = {}) => {

        const res = await fetch(API_TASKS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });

        const { success, message } = await res.json();
        if (!success) throw new Error(message)
        getTasks();
    }

    const removeTask = async (taskId) => {
        const res = await fetch(`${API_TASKS}/${taskId}`, {
            method: 'DELETE'
        });
        const { success, message } = await res.json();
        if (!success) throw new Error(message);
        getTasks();
    }

    const updateTask = async (updatedTask) => {
        const res = await fetch(`${API_TASKS}/${updatedTask.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        });

        const { success, message } = await res.json();

        if (!success) throw new Error(message);

        getTasks();
    }

    return [tasks, getTasks, addTask, removeTask, updateTask];
}

export default useTasks;