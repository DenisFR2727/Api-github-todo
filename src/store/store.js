import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "../components/todo/todoSlice";


const store = configureStore({
    reducer: rootReducer
})
export default store;

