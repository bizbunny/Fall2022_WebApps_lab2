import "./styles/App.css";
import UserBar from "./components/UserBar";
import Todolist from "./components/Todolist";
import React, { useState, useEffect, useReducer } from "react";
import CreateTodo from "./components/CreateTodo";
import appReducer from "./Reducers";

import Header from "./Header";

//import { v4 as uuidv4 } from "uuid";

import { ThemeContext, StateContext } from "./context";
import ChangeTheme from "./Themes/ChangeTheme";

import { useResource } from "react-request-hook";

import { BrowserRouter, Routes, Route} from "react-router-dom";
//import Layout from "./";
//import HomePage from "./";
//import TodoPage from "./";

function App() {
  //setUser to dispatch * * *
  //const [user, setUser] = useState("");
  const initialTodos = [];

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

  const [todo, getTodo] = useResource(() => ({
    url: "/todo",
    method: "get",
  }));

  useEffect(getTodo, []);

  useEffect(() => {
    if (todo && todo.data) {
      dispatch({ type: "FETCH_TODOS", todo: todo.data.reverse() });
    }
  }, [todo]);

  return (
    <div className="App">
      <StateContext.Provider value={{ state, dispatch }}>
        <ThemeContext.Provider value={theme}>
          <Header title="My To Do" />
          <ChangeTheme theme={theme} setTheme={setTheme} />
          <React.Suspense fallback={"Loading..."}>
            <UserBar />
          </React.Suspense>
          <div className="align-content">
            <Todolist />
          </div>
          {state.user && <CreateTodo />}
        </ThemeContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
