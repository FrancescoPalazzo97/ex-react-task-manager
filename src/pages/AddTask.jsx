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
                        <label for="exampleFormControlInput1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTask
