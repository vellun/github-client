import { AllReposPage } from "App/pages/AllReposPage";
import { RepoDetailPage } from "App/pages/RepoDetailPage";
import { Layout } from "components/Layout";
import { routesConfig } from "config/routes";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useQueryParamsStoreInit } from "store/RootStore/hooks/useQueryParamsStoreInit";
import "styles/_styles.scss";

const App = () => {
  return (
    <BrowserRouter>
      <QueryParamsStoreInit />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to={routesConfig.repositories.mask} replace={true} />} />
          <Route path={routesConfig.repositories.mask} element={<AllReposPage />} />
          <Route path={routesConfig.repoDetail.mask} element={<RepoDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const QueryParamsStoreInit = () => {
  useQueryParamsStoreInit();
  return null;
};

export default App;
