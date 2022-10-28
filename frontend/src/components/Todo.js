import React, { useState, useContext } from "react";
import { ThemeContext } from "../context";
import { useResource } from "react-request-hook";

import { StateContext } from "../context";

function Todo({
  title,
  content,
  author,
  dateCreated,
  complete,
  onRemove,
  onComplete,
  t,
}) {
  const [dateCompleted] = useState(Date());
  const { secondaryColor } = useContext(ThemeContext);

  // for deleting notes
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  const [todo, deleteTodo] = useResource(
    ({ title, content, dateCreated, author }) => ({
      url: "/todo",
      method: "delete",
      data: { title, content, dateCreated, author },
    })
  );

  function handleDelete(id) {
    deleteTodo({ title, content, dateCreated, author: user });
    dispatch({
      type: "DELETE_TODO",
      title: todo?.data?.title,
      content: todo?.data?.content,
      dateCreated: todo?.data?.dateCreated,
      author: todo?.data?.author,
      id: todo?.data?.id,
    });
  }

  console.log("Post rendered");
  return (
    <div>
      <h3 style={{ color: secondaryColor }}>{title}</h3>
      <div>{content}</div>
      <br />
      <i>
        Written by <b>{author}</b>
      </i>
      <br />
      <i>Date Created: {dateCreated}</i>
      <br />
      <i>Completed: {t.complete}</i>
      <br />
      <i>
        Date of Task Completed: {t.complete ? dateCompleted.toString() : "N/A"}
      </i>
      <br />
      Completed: <input type="checkbox" onChange={() => onComplete(t.id)} />
      <button
        type="button"
        className="button-look"
        onClick={() => onRemove(t.id)}
      >
        DELETE
      </button>
    </div>
  );
}
export default React.memo(Todo);
