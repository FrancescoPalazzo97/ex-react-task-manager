import { useParams } from "react-router-dom"
import { useGlobalContext } from "../hooks/useGlobalContext";

const TaskDetails = () => {
    const { id } = useParams();
    const { tasks } = useGlobalContext();

    if (!tasks) return <div className="text-center text-light">Caricamento...</div>

    const task = tasks.find(task => task.id === parseInt(id));
    const { title, description, status, createdAt } = task;

    return (
        <div className="container">
            <div className="row py-5">
                <div className="col">
                    <div className="card text-center bg-dark text-light border-secondary">
                        <div className="card-header fw-bold border-secondary fs-3 bg-secondary">
                            {title}
                        </div>
                        <div className="card-body d-flex">
                            <p className="card-text w-50">{description}</p>
                            <div className="w-50">
                                <button className="btn btn-danger" onClick={() => console.log(`Elimina task ${task.id}`)}>Elimina</button>
                            </div>
                        </div>
                        <div className="card-footer text-light border-secondary bg-secondary">
                            {new Date(task.createdAt).toLocaleString('it-IT')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskDetails
