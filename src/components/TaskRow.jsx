import { memo } from "react"

const TaskRow = memo(({ task }) => {

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
        <tr key={task.id}>
            <td>{task.title}</td>
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
