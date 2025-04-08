import { Layout } from "App/Layout";
import { useQueryParamsStoreInit } from "store/RootStore/hooks/useQueryParamsStoreInit";
import "styles/_styles.scss";

const App = () => {
  useQueryParamsStoreInit();
  return <Layout />;
};

export default App;
