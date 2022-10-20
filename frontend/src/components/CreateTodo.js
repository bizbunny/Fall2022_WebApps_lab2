import { useState, useContext, useEffect } from "react";
import "../styles/App.css";
import { v4 as uuidv4 } from "uuid";
import { StateContext } from "../context";
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

  // function handleChecked() {
  //   setChecked(!checked);
  // }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        dispatch({
          type: "CREATE_TODO",
          title: title,
          content: content,
          author: user,
          complete: checked,
          dateCreated: dateCreated.toString(),
          dateCompleted: checked ? dateCompleted.toString() : "",
          id: uuidv4(),
        });
      }}
    >
      <div class="align-content">
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
          <input type="submit" value="CREATE" class="button-look" />
        </div>
      </div>
    </form>
  );
}
