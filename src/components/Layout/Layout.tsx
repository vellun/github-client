import { Navbar } from "components/Navbar";
import { Outlet } from "react-router";
import { Sidebar } from "./components/Sidebar";
import styles from "./Layout.module.scss";
import { useState } from "react";

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  return (
    <div>
      <Navbar openSidebar={openSidebar} />
      <div className={styles.layout}>
        <Outlet />
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>
    </div>
  );
};
