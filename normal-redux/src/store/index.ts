import { TodosState } from "./todos/types";

export interface RootState {
  todos: TodosState;
}

export { fetchTodos, toggleTodoCompleted } from "./todos/todos";
