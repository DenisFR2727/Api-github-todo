import { createSlice, createSelector} from "@reduxjs/toolkit";
type User = {
    html_url: string;
};
interface Todo {
    id: number;
    title: string;
    number: number,
    comments: number,
    user: User,
    completed: boolean;
}
interface TodoState {
    todos: Todo[],
    inProgress: Todo[],
    completedTodos: Todo[]
}
 
const initialState: TodoState = {
    todos: JSON.parse(localStorage.getItem('todos') || '[]'),
    inProgress: JSON.parse(localStorage.getItem('inProgress') || '[]'),
    completedTodos: JSON.parse(localStorage.getItem('completed') || '[]'),
}
const todosSlice = createSlice({
      name: "todos",
      initialState,
      reducers: {
           addIssues(state, action) {
                state.todos = action.payload;
                localStorage.setItem('todos', JSON.stringify(state.todos));   
           },
           moveInProgress(state, action) {
            const index = state.todos.findIndex((todo) => todo.id === action.payload);  
            if (index !== -1) {
                const todo = state.todos.splice(index, 1)[0];
                state.inProgress.unshift(todo);
                localStorage.setItem('todos', JSON.stringify(state.todos));
                state.inProgress.unshift(todo);
                localStorage.setItem('inProgress', JSON.stringify(state.inProgress));

              };   
           },
           doneTodoMove(state, action) {
            const index = state.inProgress.findIndex((todo) => todo.id === action.payload);
            if(index !== -1){
                const todo = state.inProgress.splice(index, 1)[0];

                state.completedTodos.unshift(todo);

                localStorage.setItem('inProgress', JSON.stringify(state.inProgress));
                state.completedTodos.unshift(todo);
                localStorage.setItem('completed', JSON.stringify(state.completedTodos));
            };     
           },
           doneToProgress(state, action) {
            const index = state.completedTodos.findIndex((todo) => todo.id === action.payload);
            if(index !== -1){
                const todo = state.completedTodos.splice(index, 1)[0];

                state.inProgress.unshift(todo);

                localStorage.setItem('completed', JSON.stringify(state.completedTodos));
                state.inProgress.unshift(todo);
                localStorage.setItem('inProgress', JSON.stringify(state.inProgress));

            };  
           },
      }

});
export const todosList = createSelector(
    (state: TodoState) => state.todos,
    (todos: Todo[]) => todos
);
export const inProgressList = createSelector(
    (state: TodoState) => state.inProgress,
    (todos: Todo[]) => todos
  );
export const completedTodosList = createSelector(
    (state: TodoState) => state.completedTodos,
    (todos: Todo[]) => todos
  );

const { actions, reducer } = todosSlice;

export const { addIssues, 
               moveInProgress, 
               doneTodoMove,
               doneToProgress 
             } = actions;

export default reducer;
