import { Navbar } from "components/Navbar";
import { Outlet } from "react-router";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      {children}
      <Outlet />
    </div>
  );
};
