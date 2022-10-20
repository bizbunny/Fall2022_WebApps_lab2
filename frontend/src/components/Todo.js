import React, { useState, useContext } from "react";
import { ThemeContext } from "../context";
export default function Todo({
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
