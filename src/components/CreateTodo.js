import { useState } from "react";
export default function CreateTodo({ user, todo, setTodo }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //   function handleCreate() {
  //     const newPost = { title, content, author: user };
  //     setTodo([newPost, ...initialPosts]);
  //   }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const newTodo = {
          title: title,
          content,
          author: user,
        };

        setTodo([newTodo, ...todo]);
      }}
    >
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
      <input type="submit" value="Create" />
    </form>
  );
}
