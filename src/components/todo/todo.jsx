
import React, {useState} from 'react';
import './todo.css';
//import {DeleteIcon} from '@mui/icons-material/Delete';


export const Todo =() => {
    
      const[inputText, setInputText] = useState('');
      const[todos, setTodos] = useState([]);
      //const[checked, setChecked] = useState();

      function addTodo() {
        const newTodos = [...todos, {text:inputText, checked:false}];
        setTodos(newTodos);
      }

      function deleteTodo(deletedTodo) {
        setTodos(todos.filter(todo => todo.text !== deletedTodo))
      }

      function checkOffTodo(setChecked){
        setChecked.checked= (!setChecked.checked);
      }

      return (
        <div className = "todoList"><h1>Todo List</h1><div>
          <input type="text"
            onChange={(event) => setInputText(event.target.value)}
            placeholder="add item" />
          <button onClick={addTodo}>Add</button>
          {todos.map((todo)  => (<TodoItem text={todo.text} checkOffTodo={checkOffTodo} deleteTodo={deleteTodo} />))}
        </div></div>
      );
};


const TodoItem = (props) => {
  return <div className = {props.checked ? 'completed' : 'notCompleted'}>
    <input type = "Checkbox" name="text" onChange ={() => props.checkOffTodo(props)}></input>
    {props.text}
    <button onClick={() => props.deleteTodo(props.text)}>Delete</button>
    </div>;
}

