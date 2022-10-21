import React, { useContext } from "react";
import { ThemeContext } from "./context";
const Header = ({ title }) => {
  const { primaryColor } = useContext(ThemeContext);
  return <h1 style={{ color: primaryColor }}>{title}</h1>;
};
export default Header;
