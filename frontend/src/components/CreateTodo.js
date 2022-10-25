import { useState, useContext, useEffect } from "react";
import "../styles/App.css";
import { v4 as uuidv4 } from "uuid";
import { StateContext } from "../context";

import { useResource } from "react-request-hook";

export default function CreateTodo() {
  //setUser to dispatch * * *
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dateCreated] = useState(Date());
  const [checked] = useState(false); //to move
  const [dateCompleted] = useState(Date()); //to move
  const [error, setError] = useState(false);
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [todo, createTodo] = useResource(
    ({ title, content, dateCreated, author }) => ({
      url: "/todo",
      method: "post",
      data: { title, content, dateCreated, author },
    })
  );

  // function handleChecked() {
  //   setChecked(!checked);
  // }

  function handleCreate() {
    createTodo({ title, content, dateCreated, author: user });
    dispatch({
      type: "CREATE_TODO",
      title,
      content,
      dateCreated,
      author: user,
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        /* dispatch({
          type: "CREATE_TODO",
          title: title,
          content: content,
          author: user,
          complete: checked,
          dateCreated: dateCreated.toString(),
          dateCompleted: checked ? dateCompleted.toString() : "",
          id: uuidv4(),
        }); */
        handleCreate();
      }}
    >
      <div className="align-content">
        <br />
        <div>
          Author: <b>{user}</b>
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