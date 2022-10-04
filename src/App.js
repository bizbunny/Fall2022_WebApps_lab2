import "./styles/App.css";
import UserBar from "./components/UserBar";
import Todolist from "./components/Todolist";
import { useState, useReducer } from "react";
import CreateTodo from "./components/CreateTodo";
import appReducer from "./Reducers";

import { v4 as uuidv4 } from "uuid";

function App() {
  //setUser to dispatch * * *
  //const [user, setUser] = useState("");
  const initialTodos = [
    {
      title: "first todo",
      content: "content 1",
      author: "1",
      complete: "true",
      id: uuidv4(),
    },
    {
      title: "second todo",
      content: "content 2",
      author: "2",
      complete: "false",
      id: uuidv4(),
    },
  ];
  //const [todo, setTodo] = useState(initialTodos);

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todo: initialTodos,
  });

  return (
    <div className="App">
      <header className="App-header">
        <UserBar user={state.user} dispatch={dispatch} />
        <Todolist todo={state.todo} />
        {state.user && (
          <CreateTodo user={state.user} todo={state.todo} dispatch={dispatch} />
        )}
      </header>
    </div>
  );
}

export default App;
