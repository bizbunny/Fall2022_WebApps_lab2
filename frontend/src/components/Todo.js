import React, { useState, useContext, useEffect } from "react";
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
  const [error, setError] = useState(false);

  const [dateCompleted] = useState(Date());
  const { secondaryColor } = useContext(ThemeContext);

  // for deleting notes
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  // const [getTodo] = useResource(
  //   ({ title, content, dateCreated, author, id }) => ({
  //     url: `/todo/:${id}`,
  //     method: `get`,
  //     data: { title, content, dateCreated, author, id },
  //   })
  // );
  const [todo, deleteTodo] = useResource(
    ({ title, content, dateCreated, author, id }) => ({
      url: `/todo/${id}`,
      method: `delete`,
      data: { title, content, dateCreated, author, id },
    })
  );

  useEffect(() => {
    if (todo?.error) {
      setError(true);
    }
    if (todo?.isLoading === false && todo?.data) {
      dispatch({
        type: "DELETE_TODO",
        title: todo.data.title,
        content: todo.data.content,
        dateCreated: todo.data.dateCreated,
        author: todo.data.author,
        id: todo.data.id,
      });
    }
  }, [todo]);

  function handleDelete(title, content, dateCreated, author, id) {
    //getTodo({ title, content, dateCreated, author, id });
    deleteTodo({ title, content, dateCreated, author, id });
    //todo.deleteTodo({ title, content, dateCreated, author, id });
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
        onClick={() =>
          handleDelete(t.title, t.content, t.dateCreated, t.author, t.id)
        }
      >
        DELETE
      </button>
    </div>
  );
}
export default React.memo(Todo);
