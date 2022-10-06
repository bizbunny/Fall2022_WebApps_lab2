function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return action.username;
    case "LOGOUT":
      return "";
    default:
      return state;
  }
}
function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE_TODO":
      const newTodo = {
        title: action.title,
        content: action.content,
        author: action.author,
        complete: action.complete,
        dateCreated: action.dateCreated,
        dateCompleted: action.dateCompleted,
        id: action.id,
      };
      return [newTodo, ...state];
    case "TOGGLE_TODO":
      return "";
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
}
export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    todo: todoReducer(state.todo, action),
  };
}
