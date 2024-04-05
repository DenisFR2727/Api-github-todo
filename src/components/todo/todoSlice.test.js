import { configureStore } from '@reduxjs/toolkit';
import reducer, { addIssues } from './todoSlice';

describe('todos reducer', () => {
  it('should handle initial state', () => {
    const store = configureStore({ reducer: { todos: reducer } });
    expect(store.getState().todos).toEqual({
      todos: [],
      inProgress: [],
      completedTodos: []
    });
  });

  it('should handle addIssues', () => {
    const store = configureStore({ reducer: { todos: reducer } });
    store.dispatch(addIssues([{ id: 1, title: 'Test issue', number: 1, comments: 0, user: { html_url: 'https://github.com/test' }, completed: false }]));
    expect(store.getState().todos.todos).toEqual([{ id: 1, title: 'Test issue', number: 1, comments: 0, user: { html_url: 'https://github.com/test' }, completed: false }]);
  });

  // Add more tests for other actions here
});