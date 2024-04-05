import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './todoSlice';
import Todo from './todo';

test('renders Todo without crashing', () => {
  const store = configureStore({ reducer: { todos: reducer } });
  render(
    <Provider store={store}>
      <Todo />
    </Provider>
  );
  expect(screen.getByText('ToDo')).toBeInTheDocument();
 
});
