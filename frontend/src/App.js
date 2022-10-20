import "./styles/App.css";
import UserBar from "./components/UserBar";
import Todolist from "./components/Todolist";
import { useState, useEffect, useReducer } from "react";
import CreateTodo from "./components/CreateTodo";
import appReducer from "./Reducers";

import Header from "./Header";

import { v4 as uuidv4 } from "uuid";

import { ThemeContext, StateContext } from "./context";
import ChangeTheme from "./Themes/ChangeTheme";
function App() {
  //setUser to dispatch * * *
  //const [user, setUser] = useState("");
  const initialTodos = [
    {
      title: "first todo",
      content: "content 1",
      author: "1",
      complete: false,
      dateCompleted: "",
      dateCreated: "Tues Oct 04 2022",
      id: uuidv4(),
    },
    {
      title: "second todo",
      content: "content 2",
      author: "2",
      complete: false,
      dateCompleted: "",
      dateCreated: "Sun Oct 02 2022",
      id: uuidv4(),
    },
  ];

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todo: initialTodos,
  });

  const { user } = state;

  useEffect(() => {
    if (user) {
      document.title = `${user}’s To Do List`;
    } else {
      document.title = "To Do";
    }
  }, [user]);

  const [theme, setTheme] = useState({
    primaryColor: "deepskyblue",
    secondaryColor: "coral",
  });

  return (
    <div className="App">
      <StateContext.Provider value={{ state, dispatch }}>
        <ThemeContext.Provider value={theme}>
          <Header title="My To Do" />
          <ChangeTheme theme={theme} setTheme={setTheme} />
          <UserBar />
          <div class="align-content">
            <Todolist />
          </div>
          {state.user && <CreateTodo />}
        </ThemeContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
