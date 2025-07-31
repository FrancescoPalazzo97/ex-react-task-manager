import { createContext, useContext, useState, useEffect } from "react";
const API_TASKS = import.meta.env.VITE_API_TASKS;

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
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

    const value = {
        tasks
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}