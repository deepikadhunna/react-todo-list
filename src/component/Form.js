import { useEffect, useState } from "react";
import "./Form.css";

export default function App() {
 
  const [todos, setTodos] = useState(() => {
    
    const savedTodos = localStorage.getItem("todos");
   
    if (savedTodos) {
      
      return JSON.parse(savedTodos);
      
    } else {
     
      return [];
    }
  });
  
  const [todo, setTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});


 
  useEffect(() => {
    
    localStorage.setItem("todos", JSON.stringify(todos));
   
  }, [todos]);


  function handleInputChange(e) {
    
    setTodo(e.target.value);
  }


  function handleFormSubmit(e) {

    e.preventDefault();

   
    if (todo !== "") {
     
      setTodos([
        
        ...todos,
        {
          
          id: todos.length + 1,
          
          text: todo.trim()
        }
      ]);
    }

    
    setTodo("");
  }

  function handleDeleteClick(id) {
    
    const removeItem = todos.filter((todo) => {
      
      return todo.id !== id;
    });
    
    setTodos(removeItem);
  }
  function handleEditClick(todo) {
    
    setIsEditing(true);
    
    setCurrentTodo({...todo});
  }

  const editChangeHandler=event=>{
    setCurrentTodo({...currentTodo,text:event.target.value});
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();
    handleUpdateTodo(currentTodo.id, currentTodo);
  }
  function handleUpdateTodo(id, updatedTodo) {
    
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    
    
    setTodos(updatedItem);
    setIsEditing(false);
  }
  
  return (
      <container className="App">

     
    <div className="deee">

       {isEditing?(

            <form className="editform" onSubmit={handleEditFormSubmit}>
<h2>edit To-Do</h2>
<input className="editinput" type ='text'
name='edit-todo'
placeholder="Edit todo"
value={currentTodo.text}
onChange={editChangeHandler}
>
</input>
<button className="cancelbutton" onClick={()=>setIsEditing(false)}>Cancel</button>
<button className="updatebutton" type="submit">Update</button>


            </form>
        
       ):(
    
      <form onSubmit={handleFormSubmit}>
        
        <input className="input"
          name="todo"
          type="text"
          placeholder="Create a new todo..."
          value={todo}
          onChange={handleInputChange}
        />
      </form>
       )}
      <ul className="todo-list">
       
        {todos.map((todo) => (
          
          <li key={todo.id}>
            
            {todo.text}{" "}
            <button className="buttondel" onClick={() => handleDeleteClick(todo.id)}>X</button>
          
            <button  className = "buttonedit" onClick={() => handleEditClick(todo)}>Edit</button> 
            
          </li>
        ))}
      </ul>
    </div>
    </container>
    
  );
}
