import "./styles/App.css";
import UserBar from "./components/UserBar";
import Todolist from "./components/Todolist";
import {useState} from 'react';
import CreateTodo from "./components/CreateTodo";
function App() {
  const [user, setUser] = useState('')
  const initialPosts = [
    {
      title:"",
      content:"",
      author:""
    }
  ]
  const [todo, setTodo] = useState(initialPosts)
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <UserBar user={user && <CreateTodo user={user} todo={todo} setTodo={setTodo}/>} setUser={setUser} />
      <Todolist />
    </div>
  );
}

export default App;
