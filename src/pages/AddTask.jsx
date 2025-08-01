import { useState, useRef } from "react";
const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/\`~`;

const AddTask = () => {
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(``);
    const descriptionRef = useRef();
    const statusRef = useRef();

    const handleChange = e => {
        setErrors({});
        if (!e.target.value) setErrors({ ...errors, title: `Aggiungi un titolo!!!` })
        const titleIsValid = ![...e.target.value].some(char => symbols.includes(char));
        titleIsValid ?
            setTitle(e.target.value) :
            setErrors({ ...errors, title: `Non è possibile aggiungere caratteri speciali` });
    }

    const handleSubmit = e => {
        e.preventDefault();
        setErrors({});
        if (!title) return setErrors({ ...errors, title: `Aggiungi un titolo!!!` });
        if (!statusRef.current.value) return setErrors({ ...errors, status: 'Si prega selezionare uno stato!' })
        const formData = {
            title,
            description: descriptionRef.current.value,
            status: statusRef.current.value
        }
        console.log(formData);
        setSuccessMessage(`Form inviato con successo!`);
        setTitle(``);
        descriptionRef.current.value = '';
        statusRef.current.value = 'To do'
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-light">Aggiungi un Task</h1>
            <div className="table-responsive">
                <form onSubmit={handleSubmit}>
                    {successMessage &&
                        <div className="mb-3 bg-success p-3 rounded">
                            <span >{successMessage}</span>
                        </div>}
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Titolo</label>
                        <input
                            type="text"
                            className="form-control bg-dark text-light"
                            id="title"
                            placeholder="Inserisci il titolo della task..."
                            value={title}
                            onChange={handleChange}
                        />
                        {errors.title && <span className="text-danger">{errors.title}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Descrizione</label>
                        <textarea
                            className="form-control bg-dark text-light"
                            id="description"
                            rows="3"
                            placeholder="Inserisci una descrizione..."
                            ref={descriptionRef}
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">Stato</label>
                        <select
                            className="form-select bg-dark text-light"
                            id="status"
                            ref={statusRef}
                            defaultValue="To do"
                        >
                            <option value="">Seleziona uno stato...</option>
                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                        {errors.status && <span className="text-danger">{errors.status}</span>}
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-light">
                            Aggiungi il task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTask
