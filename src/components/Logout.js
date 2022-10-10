import "../styles/App.css";
export default function Logout({ user, dispatch }) {
  //setUser to dispatch * * *
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
      }}
    >
      <div class="align-content">
        Logged in as: <b>{user} </b>
        <input type="submit" className="button-look" value="Logout" />
      </div>
    </form>
  );
}
