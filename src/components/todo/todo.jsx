
import React, {useState} from 'react';
import './todo.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import { useContext } from 'react';
import { myContext } from '../apps/App';
import Button from '@mui/material/Button';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


export const Todo =() => {
    
      const[inputText, setInputText] = useState('');
      const{todos, setTodos} = useContext(myContext);

      function addTodo() {
        const newTodos = [...todos, {text:inputText, checked:false}];
        setTodos(newTodos);
      }

      function deleteTodo(deletedTodo) {
        setTodos(todos.filter(todo => todo.text !== deletedTodo));
      }

      function checkOffTodo(checkedTodo){
        const newTodos = todos.map((todo) => {
          if (todo.text === checkedTodo) {
            return { ...todos, text: todo.text, checked: !todo.checked };
          }
          return { ...todos, text: todo.text, checked: todo.checked };
        });
        setTodos(newTodos);
      }

      return (
        <div data-testid="todo" className = "todoList"><h1>Todo List</h1><div>
          <input type="text"
            onChange={(event) => setInputText(event.target.value)}
            placeholder="add item" />
          <Button onClick={addTodo}>Add</Button>
          {todos.map((todo)  => (<TodoItem text={todo.text} checkOffTodo={checkOffTodo} deleteTodo={deleteTodo} checked={todo.checked}/>))}
        </div></div>
      );
};


const TodoItem = (props) => {
  return <div className = {props.checked ? 'completed' : 'notCompleted'}>


<Grid container spacing={0} className="grid">

  <Grid item xs={3} className = {props.checked ? 'completed' : 'notCompleted'}>
    {props.text}
    </Grid>

    <Grid item xs={0}>
      <Button onClick={() => props.deleteTodo(props.text)}><DeleteIcon/></Button>

    </Grid>
    <Grid item xs={0}>
    <Button onClick={() => props.checkOffTodo(props.text)}><CheckBoxIcon/></Button>
    </Grid>
    </Grid>
    </div>;
}

