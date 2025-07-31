import { createContext, useContext, useState, useEffect } from "react";
import useTasks from "../hooks/useTasks"
const API_TASKS = import.meta.env.VITE_API_TASKS;

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    const [tasks, addTask, removeTask, updateTask] = useTasks();

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