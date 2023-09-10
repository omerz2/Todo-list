import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingTaskIndex, setEditingTaskIndex] = useState(-1);
  const [editingValue, setEditingValue] = useState('');

  const handleAddTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleStartEdit = (index) => {
    setEditingTaskIndex(index);
    setEditingValue(tasks[index]);
  };

  const handleFinishEdit = () => {
    const newTasks = [...tasks];
    newTasks[editingTaskIndex] = editingValue;
    setTasks(newTasks);
    setEditingTaskIndex(-1); 
    setEditingValue(''); 
  };

  const handleEditTask = (index) => {
    if (editingTaskIndex !== index) {
      handleStartEdit(index);
    } else {
      handleFinishEdit();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>To-Do List</h2>

        <div>
        <input
  className="big-textbox"
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  placeholder="Enter a task..."
/>

          <button onClick={handleAddTask}>Add</button>
        </div>

        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {editingTaskIndex === index ? (
                <input 
                  value={editingValue}
                  onChange={e => setEditingValue(e.target.value)}
                />
              ) : (
                task
              )}
              <button onClick={() => handleEditTask(index)}>
                {editingTaskIndex === index ? 'Save' : 'Edit'}
              </button>
              <button onClick={() => handleDeleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
