import React, { useState, useEffect } from "react";
import ThemeItem from "./ThemeItem";
const THEMES = [
  { primaryColor: "deepskyblue", secondaryColor: "coral" },
  { primaryColor: "orchid", secondaryColor: "mediumseagreen" },
];
export default function ChangeTheme({ theme, setTheme }) {
  const [themes, setThemes] = useState([]);
  useEffect(() => {
    fetch("/api/themes")
      .then((result) => result.json())
      .then((themes) => setThemes(themes));
  }, []);
  function isActive(t) {
    return (
      t.primaryColor === theme.primaryColor &&
      t.secondaryColor === theme.secondaryColor
    );
  }
  return (
    <div>
      Change theme:
      {THEMES.map((t, i) => (
        <ThemeItem
          key={"theme- " + i}
          theme={t}
          active={isActive(t)}
          onClick={() => setTheme(t)}
        />
      ))}{" "}
    </div>
  );
}
