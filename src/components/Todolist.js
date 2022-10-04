import Todo from "./Todo";
export default function Todolist({ todo = [] }) {
  return (
    <div>
      {todo.map((t, i) => (
        <Todo {...t} key={t.id} />
      ))}
    </div>
  );
}
