import { createSlice } from '@reduxjs/toolkit';
type User = {
    html_url: string;
};
type TodoStatus = 'todos' | 'inProgress' | 'completed';

interface Todo {
    id: number;
    title: string;
    number: number;
    comments: number;
    user: User;
    status: TodoStatus;
    completed: boolean;
}
export interface TodoState {
    todos: Todo[];
}
const initialState: TodoState = {
    todos: JSON.parse(localStorage.getItem('todos') || '[]'),
};
const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addIssues(state, action) {
            state.todos = action.payload.map((issue: Todo) => ({
                ...issue,
                status: 'todos',
            }));
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        setStatus(state, action) {
            const { id, status } = action.payload;
            const index = state.todos.findIndex((todo: Todo) => todo.id === id);
            if (index !== -1) {
                const [todo] = state.todos.splice(index, 1);
                todo.status = status;
                state.todos.unshift(todo);
                localStorage.setItem('todos', JSON.stringify(state.todos));
            }
        },
    },
});
const { actions, reducer } = todosSlice;

export const { addIssues, setStatus } = actions;

export default reducer;
