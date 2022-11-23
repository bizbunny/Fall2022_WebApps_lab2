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

  _id,
}) {
  const [error, setError] = useState(false);

  const [dateCompleted] = useState(Date());
  const { secondaryColor } = useContext(ThemeContext);

  /*  // for deleting notes
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
  } */

  const { state, dispatch } = useContext(StateContext);
  const [todelete, deleteTodo] = useResource((_id) => ({
    url: `/todo/delete/${_id}`,
    method: `delete`,
    headers: { Authorization: `${state.user.access_token}` },
  }));
  const [todoComplete, updateTodo] = useResource((complete) => ({
    url: `/todo/toggle/${_id}`,
    method: `patch`,
    headers: { Authorization: `${state.user.access_token}` },
    data: { complete },
  }));
  function handleToggle(complete) {
    // updateTodo({ id, complete });
    console.log("To fix"); //debug
    todoComplete.complete = !todoComplete.complete;
    updateTodo(complete);
    if (todoComplete?.isLoading === false && todoComplete?.data) {
      dispatch({
        type: "TOGGLE_TODO",
        complete: todoComplete.data.complete,
      });
    }
  }
  console.log("Todo rendered"); //debug
  return (
    <div>
      <Link to={`/todo/${_id}`}>
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
      <i>Completed: {todoComplete.complete}</i>
      <br />
      <i>
        Date of Task Completed: {complete ? dateCompleted.toString() : "N/A"}
      </i>
      <br />
      Completed:{" "}
      <input type="checkbox" onChange={() => handleToggle(complete)} />
      {/* <input type="checkbox" onClick={() => handleToggle(t.id, t.complete)} />
      <button
        type="button"
        className="button-look"
        onClick={() =>
          handleDelete(t.title, t.content, t.dateCreated, t.author, t.id)
        }
      >
        DELETE
      </button> */}
      <br />
      <input
        type="submit"
        value="DELETE"
        className="button-look"
        onClick={(e) => {
          e.preventDefault();
          deleteTodo(_id);
          dispatch({
            type: "DELETE_TODO",
            id: _id,
          });
        }}
      />
    </div>
  );
}
export default React.memo(Todo);
