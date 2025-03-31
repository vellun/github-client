import Navbar from "components/Navbar";
import Button from "components/Button";
import { Outlet } from "react-router";
import "styles/styles.scss";

const App = () => {
  return (
    <div>
      <Navbar/>
      <Outlet />
    </div>
  );
};

export default App;
