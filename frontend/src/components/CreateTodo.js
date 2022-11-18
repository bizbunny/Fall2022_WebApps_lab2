import { useState, useContext, useEffect } from "react";
import "../styles/App.css";
import { v4 as uuidv4 } from "uuid";
import { StateContext } from "../context";

import { useResource } from "react-request-hook";

export default function CreateTodo() {
  //debug
  console.log("CreateTodo component executes");

  //setUser to dispatch * * *
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dateCreated] = useState(Date());
  const [complete, setComplete] = useState(false); //to move
  //const [dateCompleted] = useState(Date()); //to move
  const [error, setError] = useState(false);
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  //for creating notes
  const [todo, createTodo] = useResource(
    ({ title, content, dateCreated, complete, author }) => ({
      url: "/todo",
      method: "post",
      headers: { Authorization: `${state.user.access_token}` },
      data: { title, content, dateCreated, complete, author },
    })
  );

  useEffect(() => {
    if (todo?.isLoading === false && todo.data) {
      dispatch({
        type: "CREATE_TODO",
        title: todo.data.title,
        content: todo.data.content,
        dateCreated: todo.data.dateCreated,
        complete: todo.data.complete,
        author: todo.data.author,
        id: todo.data.id,
      });
    }
  }, [todo]);
  //debug
  console.log("inside Createtodo");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createTodo({ title, content, dateCreated, complete, author: user });
      }}
    >
      <div className="align-content">
        <br />
        <div>
          Author: <b>{user.username}</b>
        </div>
        <div>
          <label htmlFor="create-title">Title: </label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            name="create-title"
            id="create-title"
          />
        </div>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <div>
          {/*<label htmlFor="complete">Completed: </label>
        <input type="checkbox" checked={checked} onChange={handleChecked} />*/}
          {/*to move*/}
          <input type="submit" value="CREATE" className="button-look" />
        </div>
      </div>
    </form>
  );
}
