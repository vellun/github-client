import Navbar from "components/Navbar";
import Button from "components/Button";
import { Outlet } from "react-router";
import "styles/styles.scss";

const App = () => {
  return (
    <div>
      <Navbar/>
      <Outlet />
      <Button>khjjkhk</Button>
    </div>
  );
};

export default App;
