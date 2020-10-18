import { RootState } from "../index";
import {
  TodoType,
  TodosState,
  FETCH_TODOS_START,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAIL,
  TOGGLE_TODO_COMPLETED,
  TodosActionTypes,
} from "./types";

import axios, { AxiosError } from "axios";
import { ThunkDispatch } from "redux-thunk";

export const fetchTodosStart = (): TodosActionTypes => {
  return { type: FETCH_TODOS_START };
};

export const fetchTodosSuccess = (todos: TodoType[]): TodosActionTypes => {
  return { type: FETCH_TODOS_SUCCESS, payload: todos };
};

export const fetchTodosFail = (error: string): TodosActionTypes => {
  return { type: FETCH_TODOS_FAIL, payload: error };
};

export const toggleTodoCompleted = (index: number): TodosActionTypes => {
  return { type: TOGGLE_TODO_COMPLETED, payload: index };
};

export const fetchTodos = () => {
  return (dispatch: ThunkDispatch<RootState, void, TodosActionTypes>) => {
    dispatch(fetchTodosStart());
    axios
      .get<TodoType[]>("https://jsonplaceholder.typicode.com/todos?userId=2")
      .then((response) => {
        const todos = response.data;
        dispatch(fetchTodosSuccess(todos));
      })
      .catch((error: AxiosError) => {
        dispatch(fetchTodosFail(error.message));
      });
  };
};

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: undefined,
};

export function todosReducer(
  state: TodosState = initialState,
  action: TodosActionTypes
): TodosState {
  switch (action.type) {
    case FETCH_TODOS_START: {
      return { ...state, loading: true };
    }
    case FETCH_TODOS_SUCCESS: {
      return { ...state, loading: false, todos: action.payload };
    }
    case FETCH_TODOS_FAIL: {
      return { ...state, loading: false, error: action.payload };
    }
    case TOGGLE_TODO_COMPLETED: {
      const newTodos = [...state.todos];
      newTodos[action.payload].completed = !state.todos[action.payload]
        .completed;
      return { ...state, todos: newTodos };
    }
    default: {
      return state;
    }
  }
}
