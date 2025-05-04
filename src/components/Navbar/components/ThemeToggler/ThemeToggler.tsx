import { Button } from "components/Button";
import { ThemeContext } from "components/Layout/context";
import * as React from "react";

export const ThemeToggler: React.FC = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <div>
      <Button
        onClick={() => {
          setTheme(theme === "light" ? "dark" : "light");
        }}
      >
        Switch to {theme === "light" ? "Dark" : "Light"} Theme
      </Button>
    </div>
  );
};
