import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

export default function CreateTodo({ user, todo, dispatch }) {
  //setUser to dispatch * * *
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dateCreated, setDateCreated] = useState(Date());
  const [checked, setChecked] = useState(false);

  function handleChecked() {
    setChecked(!checked);
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({
          type: "CREATE_TODO",
          title: title,
          content: content,
          author: user,
          complete: checked.toString(),
          id: uuidv4(),
        });
      }}
    >
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
        <label htmlFor="complete">Completed: </label>
        <input type="checkbox" checked={checked} onChange={handleChecked} />
        <input type="submit" value="Create" />
      </div>
    </form>
  );
}
