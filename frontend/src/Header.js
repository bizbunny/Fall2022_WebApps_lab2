import React, { useContext } from "react";
import { ThemeContext } from "./context";
const Header = ({ title }) => {
  const theme = useContext(ThemeContext);
  return <h1 style={{ color: theme.primaryColor }}>{title}</h1>;
};
export default Header;
