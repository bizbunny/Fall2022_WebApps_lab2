import "./styles/App.css";
import UserBar from "./components/UserBar";
import Todolist from "./components/Todolist";
import { useState } from "react";
import CreateTodo from "./components/CreateTodo";
function App() {
  const [user, setUser] = useState("");
  const initialPosts = [
    {
      title: "first post",
      content: "content 1",
      author: "1",
      complete: "true",
    },
    {
      title: "second post",
      content: "content 2",
      author: "2",
      complete: "false",
    },
  ];
  const [todo, setTodo] = useState(initialPosts);
  return (
    <div className="App">
      <header className="App-header"></header>
      <UserBar user={user} setUser={setUser} />
      <Todolist todo={todo} setTodo={setTodo} />
      {user && <CreateTodo user={user} todo={todo} setTodo={setTodo} />}
    </div>
  );
}

export default App;
