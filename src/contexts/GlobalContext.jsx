import { createContext, useContext, useState, useEffect } from "react";
import useTasks from "../hooks/useTasks"
const API_TASKS = import.meta.env.VITE_API_TASKS;

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

    const [tasks, getTasks, addTask, removeTask, updateTask] = useTasks();

    const value = {
        tasks,
        getTasks,
        addTask,
        removeTask
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

export { GlobalContext, GlobalProvider };