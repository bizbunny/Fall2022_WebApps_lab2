import Todo from "./Todo";
export default function Todolist({ todo = [], onRemove }) {
  return (
    <div>
      {todo.map((t, i) => (
        <Todo {...t} key={t.id} t={t} onRemove={onRemove} />
      ))}
    </div>
  );
}
