import { useState } from "react";
export default function CreateTodo({ user, todo, setTodo }) {
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
        const newTodo = {
          title: title,
          content: content,
          dateCreated,
          author: user,
          complete: checked.toString(),
        };

        setTodo([newTodo, ...todo]);
        setDateCreated();
        setChecked();
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
