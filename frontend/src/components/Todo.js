import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../context";
import { useResource } from "react-request-hook";

import { StateContext } from "../context";
import { Link } from "react-router-dom";
function Todo({
  title,
  content,
  author,
  dateCreated,
  complete,
  onRemove,
  onComplete,
  t,
  _id,
}) {
  const [error, setError] = useState(false);

  const [dateCompleted] = useState(Date());
  const { secondaryColor } = useContext(ThemeContext);

  // for deleting notes
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [todo, deleteTodo] = useResource(
    ({ title, content, dateCreated, author, id }) => ({
      url: `/todo/${id}`,
      method: `delete`,
      data: { title, content, dateCreated, author, id },
    })
  );
  // for updating notes complete field
  const [todoComplete, updateTodo] = useResource(({ id, complete }) => ({
    url: `/todo/${id}`,
    method: `patch`,
    data: { id, complete },
  }));
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
    if (todoComplete?.isLoading === false && todoComplete?.data) {
      dispatch({
        type: "TOGGLE_TODO",
        id: todoComplete.data.id,
        complete: todoComplete.data.complete,
      });
    }
  }, [todo, todoComplete]);

  function handleDelete(title, content, dateCreated, author, id) {
    deleteTodo({ title, content, dateCreated, author, id });
  }
  function handleToggle(id, complete) {
    updateTodo({ id, complete });
  }

  console.log("Todo rendered"); //debug
  return (
    <div>
      <Link to={`/post/${_id}`}>
        <h3 style={{ color: secondaryColor }}>{title}</h3>
      </Link>
      <div>{content}</div>
      <br />
      <i>
        Written by <b>{author}</b>
      </i>
      <br />
      <i>Date Created: {dateCreated}</i>
      <br />
      {/* <i>Completed: {t.complete}</i> */}
      <br />
      <i>
        Date of Task Completed: {t.complete ? dateCompleted.toString() : "N/A"}
      </i>
      <br />
      Completed:{" "}
      <input type="checkbox" onClick={() => handleToggle(t.id, t.complete)} />
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
