import { createSlice, createSelector } from '@reduxjs/toolkit';
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
interface TodoState {
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
                state.todos[index].status = status;
                localStorage.setItem('todos', JSON.stringify(state.todos));
            }
        },
    },
});
export const todosList = createSelector(
    (state: TodoState) => state.todos,
    (todos: Todo[]) => todos.filter((todo) => todo.status === 'todos')
);

export const inProgressList = createSelector(
    (state: TodoState) => state.todos,
    (todos: Todo[]) => todos.filter((todo) => todo.status === 'inProgress')
);

export const completedTodosList = createSelector(
    (state: TodoState) => state.todos,
    (todos: Todo[]) => todos.filter((todo) => todo.status === 'completed')
);
const { actions, reducer } = todosSlice;

export const { addIssues, setStatus } = actions;

export default reducer;
