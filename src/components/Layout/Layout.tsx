import { SidePanel } from "components/SidePanel";
import { Navbar } from "components/Navbar";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = () => {
  return (
    <div className={styles.layout}>
      <Navbar />
      {/* <SidePanel /> */}
      <Outlet />
    </div>
  );
};
