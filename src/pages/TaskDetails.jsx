import { useParams, useNavigate } from "react-router-dom"
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useState } from "react";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import EditTaskModal from "../components/EditTaskModal";


const TaskDetails = () => {
    const { id } = useParams();
    const { tasks, removeTask, updateTask } = useGlobalContext();
    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    if (!tasks) return (
        <Loader />
    )

    try {
        const task = tasks.find(task => task.id === parseInt(id));
        if (!task) throw new Error(`Task non trovato`);
        const { title, description, status, createdAt } = task;

        const handleDelete = async () => {
            try {
                await removeTask(task.id);
                alert('Task eliminata con successo');
                navigate('/');
            } catch (e) {
                alert(`Errore: ${e}`)
                console.error(`Errore: ${e.message}`);
            }
        }

        const handleEdit = async updatedTask => {
            try {
                await updateTask(updatedTask);
                alert('Task modificata con successo!');
                setShow(false);
            } catch (e) {
                alert(`Errore: ${e}`)
                console.error(`Errore: ${e.message}`);
            }
        }

        return (
            <div className="container py-4">

                <Modal
                    title={`Elimina task`}
                    content={`Sei sicuro di eliminare questa task?`}
                    show={show === 'delete'}
                    onConfirm={handleDelete}
                    onClose={() => setShow(false)}
                />
                <EditTaskModal
                    show={show === 'edit'}
                    onClose={() => setShow(false)}
                    task={task}
                    onSave={handleEdit}
                />

                <div className="row justify-content-center">
                    <div className="col-12 col-lg-8">
                        <div className="card bg-dark text-light border-secondary shadow-lg">
                            <div className="card-header text-center border-secondary">
                                <h1 className="card-title mb-0 fw-bold text-ligth">{title}</h1>
                                <small className="text-secondary">
                                    <i className="fa-regular fa-calendar me-1"></i>
                                    {new Date(createdAt).toLocaleString('it-IT')}
                                </small>
                            </div>

                            <div className="card-body p-4">
                                <div className="row g-4">
                                    <div className="col-12 col-md-8">
                                        <div className="mb-4">
                                            <h4 className="text-secondary mb-3">
                                                <i className="fa-solid fa-file-lines me-2"></i>
                                                Descrizione
                                            </h4>
                                            <div className="bg-secondary bg-opacity-25 p-3 rounded">
                                                <p className="mb-0 lead">{description || 'Nessuna descrizione disponibile'}</p>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <h5 className="text-secondary mb-2">Status</h5>
                                            <span className={`badge fs-6 ${status === 'Done' ? 'bg-success' :
                                                status === 'Doing' ? 'bg-warning text-dark' :
                                                    status === 'To do' ? 'bg-danger' :
                                                        'bg-secondary'
                                                }`}>
                                                <i className={`me-2 ${status === 'Done' ? 'fa-solid fa-check' :
                                                    status === 'Doing' ? 'fa-solid fa-spinner' :
                                                        status === 'To do' ? 'fa-solid fa-clock' :
                                                            'fa-solid fa-question'
                                                    }`}></i>
                                                {status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-4">
                                        <div className="d-flex flex-column gap-3">
                                            <button
                                                className="btn btn-outline-primary btn-lg"
                                                onClick={() => navigate(`/`)}
                                            >
                                                <i className="fa-solid fa-arrow-left-long me-2"></i>
                                                Indietro
                                            </button>

                                            <button
                                                className="btn btn-outline-warning btn-lg"
                                                onClick={() => setShow('edit')}
                                            >
                                                <i className="fa-solid fa-pen-to-square me-2"></i>
                                                Modifica
                                            </button>

                                            <button
                                                className="btn btn-danger btn-lg"
                                                onClick={() => setShow('delete')}
                                            >
                                                <i className="fa-solid fa-trash me-2"></i>
                                                Elimina
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } catch (e) {
        console.error(`Errore: ${e}`);
        return (
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6">
                        <div className="alert alert-danger text-center">
                            <h2 className="alert-heading">{e.message}</h2>
                            <p className="mb-3">La task che stai cercando non esiste o è stata eliminata.</p>
                            <button
                                className="btn btn-outline-primary"
                                onClick={() => navigate('/')}
                            >
                                <span>Torna alla lista</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }



}

export default TaskDetails
