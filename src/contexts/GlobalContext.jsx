import { createContext } from "react";
import useTasks from "../hooks/useTasks";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

    const [tasks, getTasks, addTask, removeTask, updateTask] = useTasks();

    const value = {
        tasks,
        getTasks,
        addTask,
        removeTask,
        updateTask
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

export { GlobalContext, GlobalProvider };