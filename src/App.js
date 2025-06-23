import './App.css';
import React, {useState} from 'react';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false)
  return (
    <div className="App">
      <h1>Hi, another to-do list but in React T.T</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          {/* title */}
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" placeholder="Enter task title"></input>
          </div>
          {/* description */}
          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" placeholder="Enter task description"></input>
          </div>
          {/* add button */}
          <div className="todo-input-item">
            <button type="button" className="primaryBtn">Add</button>
          </div>
        </div>
          {/* todo and completed button */}
          <div className="bnt-area">
            <button className={`sndBtn ${isCompleteScreen === false && 'active'}`}
            onClick={() => setIsCompleteScreen (false)}>Todo</button>
            <button className={`sndBtn ${isCompleteScreen === true && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}>Completed</button>
          </div>
          {/* list of todo list */}
          <div className="todo-list">
            <div>
              <h3>Task 1</h3>
              <p>Description</p>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
