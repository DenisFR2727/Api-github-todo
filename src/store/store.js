import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "../components/todo/todoSlice.ts";

const store = configureStore({
    reducer: rootReducer
})
export default store;

