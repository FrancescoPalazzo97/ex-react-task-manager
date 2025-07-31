import { useState, useRef } from "react"

const AddTask = () => {
    const [title, setTitle] = useState('');
    const descriptionRef = useRef();
    const statusRef = useRef();

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-light">Aggiungi un Task</h1>
            <div className="table-responsive">
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Titolo</label>
                        <input
                            type="text"
                            className="form-control bg-dark text-light"
                            id="title"
                            placeholder="Inserisci il titolo della task..."
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
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
                            defaultValue=""
                        >
                            <option value="">Seleziona uno stato...</option>
                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTask
