import "../styles/App.css";
import { useContext } from "react";
import { StateContext } from "../context";
export default function Logout() {
  //setUser to dispatch * * *
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
      }}
    >
      <div className="align-content">
        Logged in as: <b>{user} </b>
        <input type="submit" className="button-look" value="Logout" />
      </div>
    </form>
  );
}
