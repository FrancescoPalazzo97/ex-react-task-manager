import { useGlobalContext } from "../hooks/useGlobalContext";
import TaskRow from "../components/TaskRow";
import { memo } from "react";
import Loader from "../components/Loader";

const TaskList = memo(() => {
    const { tasks } = useGlobalContext();

    if (!tasks) return <Loader />

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-light fw-bold">Lista Task</h1>
            <div className="table-responsive">
                <table className="table table-dark table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col" className="fw-semibold">Nome</th>
                            <th scope="col" className="fw-semibold">Stato</th>
                            <th scope="col" className="fw-semibold">Data di Creazione</th>
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
