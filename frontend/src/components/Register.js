import { useState, useContext, useEffect } from "react";
import { StateContext } from "../context";
import { useResource } from "react-request-hook";

export default function Register() {
  //setUser to dispatch * * *
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setpasswordConfirmation] = useState("");
  const { dispatch } = useContext(StateContext);

  const [status, setStatus] = useState("");

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }
  function handlepasswordConfirmation(evt) {
    setpasswordConfirmation(evt.target.value);
  }

  const [user, register] = useResource((username, password) => ({
    url: "auth/register",
    method: "post",
    data: { username, password, passwordConfirmation: password },
  }));

  // useEffect(() => {
  //   if (user && user.data && user.data.user.email) {
  //     //user.error === undefined
  //     dispatch({ type: "REGISTER", username: user.data.user.email });
  //   }
  // }, [user]);

  useEffect(() => {
    if (user && user.isLoading === false && (user.data || user.error)) {
      if (user.error) {
        setStatus("Registration failed, please try again later.");
      } else {
        setStatus("Registration successful. You may now login.");
      }
    }
  }, [user]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        register(username, password);
      }}
    >
      <label htmlFor="register-username">Username: </label>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        name="register-username"
        id="register-username"
      />
      <label htmlFor="register-password"> Password: </label>
      <input
        type="password"
        value={password}
        onChange={handlePassword}
        name="register-password"
        id="register-password"
      />
      <label htmlFor="register-password-repeat">Repeat password: </label>
      <input
        type="password"
        name="register-password-repeat"
        id="register-password-repeat"
        value={passwordConfirmation}
        onChange={handlepasswordConfirmation}
      />
      <input
        type="submit"
        value="Register"
        className="button-look"
        disabled={
          username.length === 0 ||
          password.length === 0 ||
          password !== passwordConfirmation
        }
      />
      <p>{status}</p>
    </form>
  );
}
