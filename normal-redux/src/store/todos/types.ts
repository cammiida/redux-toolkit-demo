// Response object for GET /todos
// https://jsonplaceholder.typicode.com/todos
export type TodoType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const FETCH_TODOS_START = "FETCH_TODOS_START",
  FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS",
  FETCH_TODOS_FAIL = "FETCH_TODOS_FAIL",
  TOGGLE_TODO_COMPLETED = "TOGGLE_TODO_COMPLETED";

export interface TodosState {
  readonly loading: boolean;
  readonly todos: TodoType[];
  readonly error?: string;
}

interface FetchTodosStartAction {
  type: typeof FETCH_TODOS_START;
}

interface FetchTodosSuccessAction {
  type: typeof FETCH_TODOS_SUCCESS;
  payload: TodoType[];
}
interface FetchTodosFailAction {
  type: typeof FETCH_TODOS_FAIL;
  payload: string;
}

interface ToggleTodoCompletedAction {
  type: typeof TOGGLE_TODO_COMPLETED;
  payload: number;
}

export type TodosActionTypes =
  | FetchTodosStartAction
  | FetchTodosSuccessAction
  | FetchTodosFailAction
  | ToggleTodoCompletedAction;
