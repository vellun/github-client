import { AllReposPage } from "App/pages/AllReposPage";
import { RepoDetailPage } from "App/pages/RepoDetailPage";
import { Layout } from "components/Layout";
import { routesConfig } from "config/routes";
import { createBrowserRouter, Navigate, RouteObject } from "react-router";
import { useQueryParamsStoreInit } from "store/RootStore/hooks/useQueryParamsStoreInit";
import "styles/_styles.scss";

const App = () => {
  return (
    <>
      <QueryParamsStoreInit />
      <Layout />
    </>
  );
};

const QueryParamsStoreInit = () => {
  useQueryParamsStoreInit();
  return null;
};

const routes: RouteObject[] = [
  {
    path: routesConfig.root.mask,
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/repositories" replace />,
      },
      {
        path: routesConfig.repositories.mask,
        element: <AllReposPage />,
      },
      {
        path: routesConfig.repoDetail.mask,
        element: <RepoDetailPage />,
      },
    ],
  },
  {
    // TODO: 404 page
  },
];

export const router = createBrowserRouter(routes);

export default App;
