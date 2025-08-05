import { useState, useRef } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext"
const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/\`~`;

const AddTask = () => {
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(``);
    const [errorMessage, setErrorMessage] = useState(``);
    const descriptionRef = useRef();
    const statusRef = useRef();

    const { addTask, getTasks } = useGlobalContext();

    const handleChange = e => {
        setErrors({});
        if (!e.target.value) setErrors({ ...errors, title: `Aggiungi un titolo!!!` })
        const titleIsValid = ![...e.target.value].some(char => symbols.includes(char));
        titleIsValid ?
            setTitle(e.target.value) :
            setErrors({ ...errors, title: `Non è possibile aggiungere caratteri speciali` });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors({});
        setErrorMessage('');
        setSuccessMessage('');

        if (!title) setErrors({ ...errors, title: `Aggiungi un titolo!!!` });
        if (!statusRef.current.value) setErrors({ ...errors, status: 'Si prega selezionare uno stato!' });

        const formData = {
            title,
            description: descriptionRef.current.value,
            status: statusRef.current.value
        }

        try {
            await addTask(formData);
            setSuccessMessage(`Form inviato con successo!`);
            setTitle(``);
            descriptionRef.current.value = '';
            statusRef.current.value = 'To do';
        } catch (e) {
            setErrorMessage(e.message);
        }
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-xl-6">
                    <h1 className="mb-4 text-light text-center">Aggiungi un Task</h1>

                    {successMessage && (
                        <div className="alert alert-success" role="alert">
                            {successMessage}
                        </div>
                    )}

                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Titolo</label>
                            <input
                                type="text"
                                className={`form-control bg-dark text-light ${errors.title ? 'is-invalid' : ''}`}
                                id="title"
                                placeholder="Inserisci il titolo della task..."
                                value={title}
                                onChange={handleChange}
                            />
                            {errors.title && <div className="invalid-feedback d-block">{errors.title}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Descrizione</label>
                            <textarea
                                className="form-control bg-dark text-light"
                                id="description"
                                rows="3"
                                placeholder="Inserisci una descrizione..."
                                ref={descriptionRef}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="status" className="form-label">Stato</label>
                            <select
                                className={`form-select bg-dark text-light ${errors.status ? 'is-invalid' : ''}`}
                                id="status"
                                ref={statusRef}
                                defaultValue="To do"
                            >
                                <option value="To do">To do</option>
                                <option value="Doing">Doing</option>
                                <option value="Done">Done</option>
                            </select>
                            {errors.status && <div className="invalid-feedback d-block">{errors.status}</div>}
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-light btn-lg">
                                Aggiungi il task
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddTask
