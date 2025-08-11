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

        if (tasks.some(t => t.title.toLowerCase() === task.title.toLowerCase().trim())) {
            throw new Error(`Il task è già presente`);
        }

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

    const removeMultipleTasks = async ids => {
        const promises = ids.map(async id => {
            const res = await fetch(`${API_TASKS}/${id}`, {
                method: 'DELETE'
            });
            return await res.json();
        });
        const responses = await Promise.allSettled(promises);

        const fulfilledResponses = [];
        const rejectedResponses = [];

        responses.forEach((res, i) => {
            const taskId = ids[i];
            res.status === 'fulfilled' && res.value.success
                ? fulfilledResponses.push(taskId)
                : rejectedResponses.push(taskId);
        })

        if (fulfilledResponses.length > 0) {
            setTasks(prev => prev.filter(t => !fulfilledResponses.includes(t.id)));
        }

        if (rejectedResponses.length > 0) {
            throw new Error(`Errore nell'eliminazione delle task con id: ${rejectedResponses.join(", ")}`);
        }

    }

    const updateTask = async (updatedTask) => {

        if (tasks.some(t => t.title.toLowerCase() === updatedTask.title.toLowerCase().trim())) {
            throw new Error(`Il task è già presente`);
        }

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

    return [tasks, getTasks, addTask, removeTask, removeMultipleTasks, updateTask];
}

export default useTasks;