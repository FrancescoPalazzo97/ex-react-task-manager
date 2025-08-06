import { useGlobalContext } from "../hooks/useGlobalContext";
import TaskRow from "../components/TaskRow";
import { memo, useState, useMemo, useCallback } from "react";
import Loader from "../components/Loader";

function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay);
    };
}


const TaskList = memo(() => {
    const { tasks } = useGlobalContext();
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1);
    const [searchQuery, setSearchQuery] = useState(``);
    const [selectedTaskIds, setSelectedTaskIds] = useState([]);

    const toggleSelection = taskId => {
        if (selectedTaskIds.includes(taskId)) {
            setSelectedTaskIds(prev => prev.filter(id => id !== taskId));
        } else {
            setSelectedTaskIds(prev => [...prev, taskId]);
        }
    }

    const debouncedSearch = useCallback(debounce(setSearchQuery, 500), [])

    const handleOrderClick = useCallback(key => {
        if (key === sortBy) {
            setSortOrder(prev => prev === 1 ? -1 : 1);
        } else {
            setSortBy(key);
            setSortOrder(1);
        }
    }, [sortBy]);

    const sortedTasks = useMemo(() => {
        if (!tasks) return [];

        return [...tasks]
            .filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) => {
                switch (sortBy) {
                    case 'createdAt':
                        const dateA = new Date(a.createdAt).getTime();
                        const dateB = new Date(b.createdAt).getTime();
                        return (dateA - dateB) * sortOrder;

                    case 'title':
                        return a.title.localeCompare(b.title) * sortOrder;

                    case 'status':
                        const statusValue = {
                            'Todo': 1,
                            'Doing': 2,
                            'Done': 3
                        };
                        const statusA = a.status.replace(" ", "");
                        const statusB = b.status.replace(" ", "");
                        return (statusValue[statusA] - statusValue[statusB]) * sortOrder;

                    default:
                        return 0;
                }
            })
    }, [tasks, sortBy, sortOrder, searchQuery])

    if (!tasks) return <Loader />


    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-light fw-bold">Lista Task</h1>
            <div className="mb-3">
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-4">
                        <input
                            type="text"
                            className="form-control bg-dark text-light border-secondary"
                            placeholder="Cerca task..."
                            onChange={e => debouncedSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-dark table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th
                                scope="col"
                                className="fw-semibold cursor-pointer"
                                onClick={() => handleOrderClick('title')}
                                style={{ width: '40%' }}
                            >
                                Nome
                                {sortBy === 'title' &&
                                    <span>
                                        <i className={sortOrder === 1 ? "fa-solid fa-arrow-down-a-z ms-1" : "fa-solid fa-arrow-down-z-a ms-1"} />
                                    </span>
                                }
                            </th>
                            <th
                                scope="col"
                                className="fw-semibold cursor-pointer"
                                onClick={() => handleOrderClick('status')}
                                style={{ width: '20%' }}
                            >
                                Stato
                                {sortBy === 'status' &&
                                    <span>
                                        <i className={sortOrder === 1 ? "fa-solid fa-arrow-down-1-9 ms-1" : "fa-solid fa-arrow-down-9-1 ms-1"} />
                                    </span>
                                }
                            </th>
                            <th
                                scope="col"
                                className="fw-semibold cursor-pointer"
                                onClick={() => handleOrderClick('createdAt')}
                                style={{ width: '40%' }}
                            >
                                Data di Creazione
                                {sortBy === 'createdAt' &&
                                    <span>
                                        <i className={sortOrder === 1 ? "fa-solid fa-arrow-down-1-9 ms-1" : "fa-solid fa-arrow-down-9-1 ms-1"} />
                                    </span>
                                }
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTasks.map(task => (
                            <TaskRow
                                key={task.id}
                                task={task}
                                checked={selectedTaskIds.includes(task.id)}
                                onToggle={toggleSelection}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
})

export default TaskList
