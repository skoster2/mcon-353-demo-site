import {Home} from '../home/home';
import {Todo} from '../todo/todo';
import {Chat} from '../chat/chat';
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import {Header} from '../header/header'
import React from "react";
import {useState} from "react";


export const myContext = React.createContext();

function App(){
  const[todos, setTodos] = useState([]);
  return(
    <div className='App'>
      <myContext.Provider value = {{todos, setTodos}}>
  <HashRouter>
  <Header/>
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/todo" element={<Todo/>}/>
        <Route path="/chatroom" element={<Chat/>}/>
      </Routes>
    </HashRouter>
    </myContext.Provider>
    </div>
  )
}

export default App;
