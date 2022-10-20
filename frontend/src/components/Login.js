import React, { useState, useContext, useEffect } from "react";
import { StateContext } from "../context";
export default function Login() {
  //setUser to dispatch * * *
  const [username, setUsername] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [password, setPassword] = useState("");

  const { dispatch } = useContext(StateContext);
  function handlePassword(evt) {
    setPassword(evt.target.value);
  }
  //   function handleUsername(evt) {
  //     setUsername(evt.target.value);
  //   }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN", username });
      }}
    >
      <label htmlFor="login-username">Username: </label>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        name="login-username"
        id="login-username"
      />
      <label htmlFor="login-password"> Password: </label>
      <input type="password" name="login-password" id="login-password" />
      <input
        type="submit"
        value="Login"
        className="button-look"
        disabled={username.length === 0}
      />
    </form>
  );
}
