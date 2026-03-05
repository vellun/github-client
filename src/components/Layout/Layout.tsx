import { Navbar } from "components/Navbar";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import "styles/_variables.scss";
import { Sidebar } from "./components/Sidebar";
import { BackgroundContext, ThemeContext } from "./context";
import styles from "./Layout.module.scss";
import { Bounce, ToastContainer } from "react-toastify";

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("normal");
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const location = useLocation();

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <BackgroundContext.Provider value={{ backgroundColor, setBackgroundColor }}>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={theme}
          transition={Bounce}
        />
        <Navbar openSidebar={openSidebar} />
        <div className={styles[`background-${backgroundColor}`]}>
          <div className={styles.layout}>
            <Outlet />
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          </div>
        </div>
      </BackgroundContext.Provider>
    </ThemeContext.Provider>
  );
};
