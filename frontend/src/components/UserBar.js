import React, { useContext } from "react";
import { StateContext } from "../context";
import Register from "./Registration";
import Login from "./Login";
//import Logout from "./Logout";
const Logout = React.lazy(() => import("./Logout"));
export default function UserBar() {
  //setUser to dispatch * * *
  //const [user, setUser] = useState('')
  const { state } = useContext(StateContext);
  if (state.user) {
    return <Logout />;
  } else {
    return (
      <>
        <Login />
        <Register />
      </>
    );
  }
}
