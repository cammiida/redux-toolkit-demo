import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store';
import axios, { AxiosError, AxiosResponse } from 'axios';

export type TodoType = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

export interface ITodoState {
    todos: TodoType[];
    currentTodo: TodoType | null;
    loading: boolean;
    error: string | null;
}

const initialState: ITodoState = {
    todos: [],
    currentTodo: null,
    loading: false,
    error: null,
};

const todo = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        fetchTodosStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchTodosSuccess: (state, action: PayloadAction<TodoType[]>) => {
            state.loading = false;
            state.error = null;
            state.todos = action.payload;
        },
        fetchTodosFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        toggleTodoCompleted: (state, action: PayloadAction<number>) => {
            const currentVal = state.todos[action.payload].completed;
            state.todos[action.payload].completed = !currentVal;
        },
    },
});

export const { fetchTodosStart, fetchTodosSuccess, fetchTodosFail, toggleTodoCompleted } = todo.actions;
export default todo.reducer;

export const fetchTodos = (): AppThunk => async (dispatch) => {
    dispatch(fetchTodosStart);
    console.log('fetching todos!');
    axios
        .get<TodoType[]>('https://jsonplaceholder.typicode.com/todos?userId=2')
        .then((response: AxiosResponse) => {
            const todos = response.data as TodoType[];
            dispatch(fetchTodosSuccess(todos));
        })
        .catch((error: AxiosError) => {
            dispatch(fetchTodosFail(error.message));
        });
};
