import { Navbar } from "components/Navbar";
import { Outlet } from "react-router";
import { Sidebar } from "./components/Sidebar";
import styles from "./Layout.module.scss";
import { useState } from "react";
import { BackgroundContext } from "./context";

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("normal");

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  return (
    <BackgroundContext.Provider value={{ backgroundColor, setBackgroundColor }}>
      <Navbar openSidebar={openSidebar} />
      <div className={styles[`background-${backgroundColor}`]}>
        <div className={styles.layout}>
          <Outlet />
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </div>
      </div>
    </BackgroundContext.Provider>
  );
};
