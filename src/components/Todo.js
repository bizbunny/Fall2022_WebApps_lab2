export default function Todo({
  title,
  description,
  author,
  dateCreated,
  complete,
  dateCompleted,
}) {
  return (
    <div>
      <h1>{title}</h1>
      <div>{description}</div>
      <br />
      <i>
        Written by<b>{author}</b>
      </i>
      <i>Date {dateCreated}</i>
    </div>
  );
}
