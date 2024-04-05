import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from '../todo/todoSlice';
import TodoList from '../todo/todoList';

test('renders TodoList without crashing', () => {
  const store = configureStore({ reducer: { todos: reducer } });

  render(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
});