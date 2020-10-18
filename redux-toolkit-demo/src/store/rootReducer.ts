import { combineReducers } from '@reduxjs/toolkit';
import todo from './todoSlice';

const rootReducer = combineReducers({
    todo: todo,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
