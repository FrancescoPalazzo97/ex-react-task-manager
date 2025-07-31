import { useGlobalContext } from "../contexts/GlobalContext";
import TaskRow from "../components/TaskRow";
import { memo } from "react";

const TaskList = memo(() => {
    const { tasks } = useGlobalContext();

    if (!tasks) return <div className="text-center text-light">Caricamento...</div>

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-light">Lista Task</h1>
            <div className="table-responsive">
                <table className="table table-dark table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Stato</th>
                            <th scope="col">Data di Creazione</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <TaskRow key={task.id} task={task} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
})

export default TaskList
