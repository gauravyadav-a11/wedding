import React, { useState } from 'react';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [inputTask, setInputTask] = useState('');

    const addTask = () => {
        if (inputTask.trim() !== '') {
            setTasks([...tasks, inputTask]);
            setInputTask('');
        }
    };

    const deleteTask = (index) => {
        const updatedTask = tasks.filter((_, i) => i !== index);
        setTasks(updatedTask);
    };
    return (
        <div className="App">
            <h1>Task Manager</h1>
            <div>
                <input
                    type="text"
                    value={inputTask}
                    onChange={(e) => setInputTask(e.target.value)}
                    placeholder="Enter a task"
                />
                <button onClick={addTask}>AddTask
                </button>
            </div>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {task}
                        <button onClick={() => deleteTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;