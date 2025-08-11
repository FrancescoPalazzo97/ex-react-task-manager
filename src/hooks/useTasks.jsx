import { useReducer, useEffect } from "react";
import tasksReducer from "./tasksReducer";
const API_TASKS = import.meta.env.VITE_API_TASKS;

const useTasks = () => {
    const [tasks, dispatch] = useReducer(tasksReducer, []);

    const getTasks = async () => {
        const res = await fetch(API_TASKS);
        const data = await res.json();
        dispatch({ type: 'LOAD_TASKS', payload: data });
    }

    useEffect(() => {
        getTasks();
    }, []);

    const addTask = async (newTask = {}) => {

        if (tasks.some(t => t.title.toLowerCase() === newTask.title.toLowerCase().trim())) {
            throw new Error(`Il task è già presente`);
        }

        const res = await fetch(API_TASKS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });

        const { success, message, task } = await res.json();
        if (!success) throw new Error(message)
        dispatch({ type: 'ADD_TASK', payload: task });
    }

    const removeTask = async (taskId) => {
        const res = await fetch(`${API_TASKS}/${taskId}`, {
            method: 'DELETE'
        });
        const { success, message } = await res.json();
        if (!success) throw new Error(message);
        dispatch({ type: 'REMOVE_TASK', payload: taskId });
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
            dispatch({ type: 'REMOVE_MULTIPLE_TASKS', payload: fulfilledResponses });
        }

        if (rejectedResponses.length > 0) {
            throw new Error(`Errore nell'eliminazione delle task con id: ${rejectedResponses.join(", ")}`);
        }

    }

    const updateTask = async (updatedTask) => {

        const taskWithSameTitle = tasks.find(t => t.title.toLowerCase() === updatedTask.title.toLowerCase().trim());

        if (taskWithSameTitle && taskWithSameTitle.id !== updatedTask.id) {
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

        dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
    }

    return [tasks, getTasks, addTask, removeTask, removeMultipleTasks, updateTask];
}

export default useTasks;