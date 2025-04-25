import { Navbar } from "components/Navbar";
import { SidePanel } from "components/SidePanel";
import { useState } from "react";
import { Outlet } from "react-router";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles.layout}>
      <Navbar openSidebar={openSidebar} />
      <Outlet />
      {isSidebarOpen && (
        <div className={styles.overlay} onClick={closeSidebar}>
          <SidePanel className={styles.sidebar} isOpen={isSidebarOpen} />
        </div>
      )}
    </div>
  );
};
