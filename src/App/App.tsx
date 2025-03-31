import Button from "components/Button";
import { Outlet } from "react-router";
import "styles/styles.css";

const App = () => {
  return (
    <div>
      <Outlet />
      <Button loading>khjjkhk</Button>
    </div>
  );
};

export default App;
