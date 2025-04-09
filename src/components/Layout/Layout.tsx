import { Navbar } from "components/Navbar";
import { Outlet } from "react-router";

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Outlet />
    </div>
  );
};
