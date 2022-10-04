export default function Todo({
  title,
  content,
  author,
  dateCreated,
  complete,
  dateCompleted,
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
      <i>Completed: {complete}</i>
      <br />
      <i>Date of Task Completed: {dateCompleted}</i>
    </div>
  );
}
