import { useState, useEffect } from "react";
const API_TASKS = import.meta.env.VITE_API_TASKS;

const useTasks = () => {
    const [tasks, setTasks] = useState(null);

    async function fetchJson(url) {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }

    useEffect(() => {
        (async () => {
            const data = await fetchJson(API_TASKS);
            setTasks(data);
        })();
    }, []);

    const addTask = () => {

    }

    const removeTask = () => {

    }

    const updateTask = () => {

    }

    return [tasks, addTask, removeTask, updateTask];
}

export default useTasks;