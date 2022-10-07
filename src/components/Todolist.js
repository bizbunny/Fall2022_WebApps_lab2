import Todo from "./Todo";
export default function Todolist({ todo = [], onRemove, onComplete }) {
  return (
    <div>
      {todo.map((t, i) => (
        <Todo
          {...t}
          key={t.id}
          t={t}
          onRemove={onRemove}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
}
