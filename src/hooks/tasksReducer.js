const API_TASKS = import.meta.env.VITE_API_TASKS;

export default function tasksReducer(tasks, action) {
    const { type, payload } = action;
    switch (type) {
        case 'LOAD_TASKS':
            return payload;
        case 'ADD_TASK':
            return [...tasks, payload];
        case 'REMOVE_TASK':
            return tasks.filter(t => t.id !== payload);
        case 'REMOVE_MULTIPLE_TASKS':
            return tasks.filter(t => !payload.includes(t.id));
        case 'UPDATE_TASK':
            return tasks.map(t => t.id === payload.id ? payload : t);
        default:
            return state;
    }
}