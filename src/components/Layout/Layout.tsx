import { Navbar } from "components/Navbar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Sidebar } from "./components/Sidebar";
import { BackgroundContext, ThemeContext } from "./context";
import styles from "./Layout.module.scss";
import "styles/_variables.scss";

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("normal");
  const [theme, setTheme] = useState("dark");

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <BackgroundContext.Provider value={{ backgroundColor, setBackgroundColor }}>
        <Navbar openSidebar={openSidebar} />
        <div className={styles[`background-${backgroundColor}-${theme}`]}>
          <div className={styles.layout}>
            <Outlet />
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          </div>
        </div>
      </BackgroundContext.Provider>
    </ThemeContext.Provider>
  );
};
