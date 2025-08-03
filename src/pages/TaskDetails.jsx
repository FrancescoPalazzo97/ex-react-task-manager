import { useParams, useNavigate } from "react-router-dom"
import { useGlobalContext } from "../hooks/useGlobalContext";

const TaskDetails = () => {
    const { id } = useParams();
    const { tasks, getTasks, removeTask } = useGlobalContext();

    const navigate = useNavigate();

    if (!tasks) return <div className="text-center text-light">Caricamento...</div>

    try {
        const task = tasks.find(task => task.id === parseInt(id));
        if (!task) throw new Error(`Task non trovato`);
        const { title, description, status, createdAt } = task;

        const handleDelete = async () => {
            const data = await removeTask(task);
            if (data.success) {
                getTasks();
                navigate(`/`);

            } else {
                alert(`Errore: ${data.message}`)
                console.error(`Errore: ${data.message}`);
            }
        }

        return (
            <div className="container">
                <div className="row py-5">
                    <div className="col">
                        <div className="card text-center bg-dark text-light border-secondary">
                            <div className="card-header fw-bold border-secondary fs-3 bg-secondary">
                                {title}
                            </div>
                            <div className="card-body d-flex">
                                <div className="card-text w-50">
                                    <h4>Descrizione</h4>
                                    <p>{description}</p>
                                </div>
                                <div className="w-50">
                                    <button className="btn btn-danger" onClick={handleDelete}>Elimina</button>
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
    } catch (e) {
        console.error(`Errore: ${e}`);
        return <div className="text-center text-light py-5 fs-1">Questa task non esiste</div>
    }



}

export default TaskDetails
