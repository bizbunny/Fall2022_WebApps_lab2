function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      //return action.username;
      return {
        username: action.username,
        access_token: action.access_token,
      }
    case "LOGOUT":
      return null;
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
      return state.map((todo) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            complete: !todo.complete,
            dateCompleted: action.dateCompleted,
          };
        } //if checkbox is modified give a new state
        else {
          return todo;
        } //else
      });
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    case "FETCH_TODOS":
      return action.todo;
    case "CLEAR_TODOS":
      return [];
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
