import "./styles/App.css";
//import UserBar from "./components/UserBar";
//import Todolist from "./components/Todolist";
import React, { useState, useEffect, useReducer } from "react";

import appReducer from "./Reducers";

import { useResource } from "react-request-hook";
//import Header from "./Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { v4 as uuidv4 } from "uuid";

import { ThemeContext, StateContext } from "./context";
import ChangeTheme from "./Themes/ChangeTheme";

import CreateTodo from "./components/CreateTodo";

import Layout from "./pages/Layout";
import HomePage from "./pages/Homepage";
import TodoPage from "./pages/TodoPage";

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
    headers: { Authorization: `${state?.user?.access_token}` },
  }));

  useEffect(() => {
    getTodo();
  }, [state?.user?.access_token]);

  useEffect(() => {
    if (todo && todo.isLoading === false && todo.data) {
      dispatch({ type: "FETCH_TODOS", todo: todo.data.reverse() });
    }
  }, [todo]);

  return (
    <div className="App">
      <StateContext.Provider value={{ state, dispatch }}>
        <ThemeContext.Provider value={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
              </Route>
              <Route path="/todo" element={<Layout />}>
                <Route path="/todo/create" element={<CreateTodo />} />
                <Route path="/todo/:id" element={<TodoPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
