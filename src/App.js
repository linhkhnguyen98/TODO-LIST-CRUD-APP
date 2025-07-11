import './App.css';
import React, {useState, useEffect} from 'react';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false)
  const [allTodos, setTodos] = useState([]); // an array of todo items
  const [newTitle, setNewTitle] = useState(""); // new string
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  // updating new titile and description function
  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription
    };
    
    // adding new items into the array
    let updateTodoArr = [...allTodos]; // making a copy of the todo array
    updateTodoArr.push(newTodoItem);
    setTodos(updateTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updateTodoArr))
  };

  // Delete items
  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos]; // copy of all todo items
    reducedTodo.splice(index, 1);
    // use the copied array reducedTodo, update localStorage with new copied array
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    // localStorage.removeItem(reducedTodo); // this wont delete localStorage
    setTodos(reducedTodo);
  };

  const handleComplete = (index) => {
    let now = new Date ();
    let dd = now.getDate ();
    let mm = now.getMonth () + 1;
    let yyyy = now.getFullYear ();
    let h = now.getHours ();
    let m = now.getMinutes ();
    let s = now.getSeconds ();
    let completedOn =
      dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push (filteredItem);
    setCompletedTodos (updatedCompletedArr);
    handleDeleteTodo (index);
    localStorage.setItem ('completedTodos', JSON.stringify (updatedCompletedArr));
  };

   const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos]; // copy of all todo items
    reducedTodo.splice(index, 1);
    // use the copied array reducedTodo, update localStorage with new copied array
    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    // localStorage.removeItem(reducedTodo); // this wont delete localStorage
    setCompletedTodos(reducedTodo);
   }

  // use effect when the page is rendered first time, we will be checking to see if 
  // there's any items in local storage or not
  useEffect (() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodo) {
      setTodos(savedTodo);
    }

    if (savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1>Hi I am the Full Stack Thingy</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          {/* title */}
          <div className="todo-input-item">
            <label>Title</label>
            <input 
            type="text" 
            value={newTitle}
            onChange={e => setNewTitle (e.target.value)}
            placeholder="Enter task title">
            </input>
          </div>
          {/* description */}
          <div className="todo-input-item">
            <label>Description</label>
            <input 
            type="text"
            value={newDescription}
            onChange={e => setNewDescription (e.target.value)}
            placeholder="Enter task description">
            </input>
          </div>
          {/* add button */}
          <div className="todo-input-item">
            <button 
            type="button" 
            onClick={handleAddTodo}
            className="primaryBtn"
            >
              Add
            </button>
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
            {isCompleteScreen === false && allTodos.map((item, index)=>{
              return(
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                      <p>{item.description}</p>
                  </div>
                  <div>
                    <RiDeleteBin5Fill 
                    className='icon' 
                    onClick={() => handleDeleteTodo(index)}
                    title="Delete?"
                    />
                    <IoCheckmarkDoneSharp 
                    className='check-icon' 
                    onClick={() => handleComplete(index)}
                    title="Complete?"
                    />
                  </div>
                </div>
              )
            })}
            {isCompleteScreen === true && completedTodos.map((item, index)=>{
              return(
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <p><i>Completed on: {item.completedOn}</i></p>
                  </div>
                  <div>
                    <RiDeleteBin5Fill 
                    className='icon' 
                    onClick={() => handleDeleteCompletedTodo(index)}
                    title="Delete?"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
    </div>
  );
}

export default App;
