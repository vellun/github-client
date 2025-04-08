import { Navbar } from "components/Navbar";
import { Outlet } from "react-router";

interface LayoutProps {
  choldren?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Outlet />
    </>
  );
};
