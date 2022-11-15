import Todo from "./Todo";
import { useContext } from "react";
import { StateContext } from "../context";
export default function Todolist() {
  const { state, dispatch } = useContext(StateContext);
  const { todo } = state;

  function handleRemove(id) {
    dispatch({ type: "DELETE_TODO", id });
  }

  function handleComplete(id) {
    dispatch({ type: "TOGGLE_TODO", id });
  }

  return (
    <div>
      {todo.map((t, i) => (
        <Todo
          {...t}
          key={t.id}
          t={t}
          onRemove={handleRemove}
          onComplete={handleComplete}
        />
      ))}
      <div>
        {todo.length === 0 && <h2>No todos found.</h2>}
        {todo.length > 0 && todo.map((t, i) => <Todo {...t} key={t._id || t.id} />)}
      </div>
    </div>
  );
}
