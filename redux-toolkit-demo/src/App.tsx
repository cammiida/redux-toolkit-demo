import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Todos from './components/Todos';
import { RootState } from './store/rootReducer';
import { useAppDispatch } from './store/store';
import { fetchTodos, toggleTodoCompleted } from './store/todoSlice';

function App() {
    const dispatch = useAppDispatch();
    const todos = useSelector((state: RootState) => state.todo.todos);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleToggleWithReduxToolkit = (index: number) => {
        dispatch(toggleTodoCompleted(index));
    };

    return (
        <div className="App">
            <header className="App-header">
                <Todos handleToggle={handleToggleWithReduxToolkit} todos={todos} />
            </header>
        </div>
    );
}

export default App;
