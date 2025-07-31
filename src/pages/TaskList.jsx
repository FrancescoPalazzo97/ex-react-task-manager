import { useGlobalContext } from "../contexts/GlobalContext"

const TaskList = () => {
    const { tasks } = useGlobalContext();

    return (
        <div>
            <h1>Lista Task</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <div className="card">
                            <div className="card-title">{task.title}</div>
                            <div className="card-text">{task.description}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TaskList
