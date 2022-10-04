import Login from "./Login";
import Logout from "./Logout";
import Register from "./Registration";
//import { useState } from "react";
export default function UserBar({ user, dispatch }) {
  //setUser to dispatch * * *
  //const [user, setUser] = useState('')

  if (user) {
    return <Logout user={user} dispatch={dispatch} />;
  } else {
    return (
      <>
        <Login dispatch={dispatch} />
        <Register dispatch={dispatch} />
      </>
    );
  }
}
