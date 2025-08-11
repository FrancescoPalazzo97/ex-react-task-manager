import { useReducer, useEffect } from "react";
import useFetch from "./useFetch";
import tasksReducer from "./tasksReducer";
const API_TASKS = import.meta.env.VITE_API_TASKS;

const useTasks = () => {
    const [tasks, dispatch] = useReducer(tasksReducer, []);

    const getTasks = async () => {
        dispatch({ type: 'LOAD_TASKS', payload: await useFetch(API_TASKS) });
    }

    useEffect(() => {
        getTasks();
    }, []);

    const addTask = async (newTask = {}) => {

        if (tasks.some(t => t.title.toLowerCase() === newTask.title.toLowerCase().trim())) {
            throw new Error(`Il task è già presente`);
        }

        const { success, message, task } = await useFetch(API_TASKS, 'POST', newTask);
        if (!success) throw new Error(message)
        dispatch({ type: 'ADD_TASK', payload: task });
    }

    const removeTask = async (taskId) => {
        const { success, message } = await useFetch(`${API_TASKS}/${taskId}`, 'DELETE');
        if (!success) throw new Error(message);
        dispatch({ type: 'REMOVE_TASK', payload: taskId });
    }

    const removeMultipleTasks = async ids => {
        const promises = ids.map(async id => await useFetch(`${API_TASKS}/${id}`, 'DELETE'));
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

        const { success, message } = await useFetch(`${API_TASKS}/${updatedTask.id}`, 'PUT', updatedTask);

        if (!success) throw new Error(message);

        dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
    }

    return [tasks, getTasks, addTask, removeTask, removeMultipleTasks, updateTask];
}

export default useTasks;