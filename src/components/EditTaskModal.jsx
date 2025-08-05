import { useRef, useState } from "react";
import Modal from "./Modal";

const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/\`~`;


const EditTaskModal = ({
    show = false,
    onClose = () => { },
    task = {},
    onSave = () => { }
}) => {
    const [editedTask, setEditedTask] = useState(task);
    const [errors, setErrors] = useState({});
    const editFormRef = useRef();

    const handleChange = (key, e) => {
        setErrors({}); // Reset errori ad ogni modifica

        if (key === 'title') {
            if (!e.target.value) setErrors({ ...errors, title: 'Il titolo non può essere vuoto!' });
            const titleIsValid = ![...e.target.value].some(char => symbols.includes(char));
            if (!titleIsValid) {
                setErrors({ ...errors, title: 'Non è possibile aggiungere caratteri speciali' });
                return;
            }
        }

        if (key === 'status' && !e.target.value) setErrors({ ...errors, status: 'Seleziona uno stato!' });

        setEditedTask(prev => ({ ...prev, [key]: e.target.value }));
    }

    const { title, description, status } = editedTask;

    const handleSubmit = e => {
        e.preventDefault();
        setErrors({});

        let formErrors = {};

        if (!title) {
            formErrors.title = 'Il titolo non può essere vuoto!';
        } else {
            const titleIsValid = ![...title].some(char => symbols.includes(char));
            if (!titleIsValid) {
                formErrors.title = 'Non è possibile aggiungere caratteri speciali';
            }
        }

        if (!status) {
            formErrors.status = 'Seleziona uno stato!';
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        onSave(editedTask);
    }

    return (
        <Modal
            title="Modifica Task"
            content={
                <form ref={editFormRef} onSubmit={handleSubmit} className="needs-validation" noValidate>
                    <div className="mb-3">
                        <label htmlFor="edit-title" className="form-label">Titolo</label>
                        <input
                            type="text"
                            className={`form-control bg-dark text-light ${errors.title ? 'is-invalid' : ''}`}
                            id="edit-title"
                            placeholder="Inserisci il titolo della task..."
                            value={title}
                            onChange={e => handleChange('title', e)}
                        />
                        {errors.title && <div className="invalid-feedback d-block">{errors.title}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="edit-description" className="form-label">Descrizione</label>
                        <textarea
                            className="form-control bg-dark text-light"
                            id="edit-description"
                            rows="3"
                            placeholder="Inserisci una descrizione..."
                            value={description}
                            onChange={e => handleChange('description', e)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="edit-status" className="form-label">Stato</label>
                        <select
                            className={`form-select bg-dark text-light ${errors.status ? 'is-invalid' : ''}`}
                            id="edit-status"
                            value={status}
                            onChange={e => handleChange('status', e)}
                        >
                            <option value="">Seleziona uno stato...</option>
                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                        {errors.status && <div className="invalid-feedback d-block">{errors.status}</div>}
                    </div>
                </form>
            }
            confirmText="Salva"
            onConfirm={() => editFormRef.current.requestSubmit()}
            onClose={onClose}
            show={show}
        />
    )
}

export default EditTaskModal