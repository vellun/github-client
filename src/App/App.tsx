import { Navbar } from "components/Navbar";
import { Outlet } from "react-router";
import { useQueryParamsStoreInit } from "store/RootStore/hooks/useQueryParamsStoreInit";
import "styles/_styles.scss";

const App = () => {
  useQueryParamsStoreInit();
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
