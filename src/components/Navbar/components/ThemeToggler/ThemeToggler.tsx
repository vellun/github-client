import MoonIcon from "assets/icons/moon.svg";
import SunIcon from "assets/icons/sun.svg";
import { ThemeContext } from "components/Layout/context";
import * as React from "react";

export const ThemeToggler: React.FC = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <button
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      <img src={theme === "light" ? MoonIcon : SunIcon} alt="Icon" width={30} height={30} />
    </button>
  );
};
