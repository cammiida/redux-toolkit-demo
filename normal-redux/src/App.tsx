import React, { useEffect } from 'react';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import './App.css';

import { RootState } from './store';
import * as actions from './store';

import Todos from './components/Todos';
import { TodosState, TodoType } from './store/todos/types';

interface StateProps {
    todos: TodoType[];
}

interface DispatchProps {
    onFetchTodos: () => void;
    onToggleTodo: (index: number) => void;
}

function App({ todos, onFetchTodos, onToggleTodo }: StateProps & DispatchProps) {
    const handleToggleWithReduxToolkit = (index: number) => {
        onToggleTodo(index);
    };

    useEffect(() => {
        onFetchTodos();
    }, [onFetchTodos]);

    return (
        <div className="App">
            <header className="App-header">
                <Todos handleToggle={handleToggleWithReduxToolkit} todos={todos} />
            </header>
        </div>
    );
}

const mapStateToProps = (state: RootState): StateProps => ({
    todos: state.todos.todos,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<TodosState, void, Action>) => ({
    onFetchTodos: () => dispatch(actions.fetchTodos()),
    onToggleTodo: (index: number) => dispatch(actions.toggleTodoCompleted(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
