import { memo } from "react"
import { Link } from "react-router-dom";

const TaskRow = memo(({
    task = {},
    checked,
    onToggle = () => { }
}) => {

    const setStatus = status => {
        switch (status) {
            case 'Done':
                return 'bg-success';
            case 'Doing':
                return 'bg-warning text-dark';
            case 'To do':
                return 'bg-danger';
            default:
                return 'bg-secondary';
        }
    }

    return (
        <tr>
            <td>
                <div className="d-flex align-items-center gap-3">
                    <input
                        type="checkbox"
                        className="form-check-input bg-dark border-secondary"
                        checked={checked}
                        onChange={() => onToggle(task.id)}
                    />
                    <Link to={`/task/${task.id}`} className="link-light link-opacity-50-hover text-decoration-none">{task.title}</Link>
                </div>
            </td>
            <td>
                <span className={`badge ${setStatus(task.status)}`}>
                    {task.status}
                </span>
            </td>
            <td>{task.createdAt ? new Date(task.createdAt).toLocaleDateString('it-IT') : 'N/A'}</td>
        </tr>
    )
})

export default TaskRow
