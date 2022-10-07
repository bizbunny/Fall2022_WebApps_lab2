import { useState } from "react";

export default function Todo({
  title,
  content,
  author,
  dateCreated,
  complete,
  dateCompleted,
  onRemove,
  onComplete,
  t,
}) {
  return (
    <div>
      <h1>{title}</h1>
      <div>{content}</div>
      <br />
      <i>
        Written by <b>{author}</b>
      </i>
      <br />
      <i>Date Created: {dateCreated}</i>
      <br />
      <i>Completed: {t.complete.toString()}</i>
      <br />
      <i>Date of Task Completed: {dateCompleted}</i>
      <br />
      Completed: <input type="checkbox" onChange={() => onComplete(t.id)} />
      <button type="button" onClick={() => onRemove(t.id)}>
        DELETE
      </button>
    </div>
  );
}
