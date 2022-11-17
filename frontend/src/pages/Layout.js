import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import UserBar from "../components/UserBar";
import Header from "../Header";
import { StateContext } from "../context";

export default function Layout() {
  const { state } = useContext(StateContext);
  const { user } = state;

  return (
    <>
      <Header text="My TodoLIst" />
      <React.Suspense fallback={"Loading..."}>
        <UserBar />
      </React.Suspense>
      <br />
      {user && <Link to="/todo/create">Create New Todo</Link>}
      <Outlet />
    </>
  );
}
