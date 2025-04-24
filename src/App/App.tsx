import { AllReposPage } from "App/pages/AllReposPage";
import { AllUsersPage } from "App/pages/AllUsersPage";
import { LoginPage } from "App/pages/LoginPage";
import { RepoDetailPage } from "App/pages/RepoDetailPage";
import { UserDetailPage } from "App/pages/UserDetailPage";
import { UserReposPage } from "App/pages/UserReposPage";
import { AuthRoute } from "components/AuthRoute";
import { Layout } from "components/Layout";
import { routesConfig } from "config/routes";
import { useEffect } from "react";
import { createHashRouter, Navigate, RouteObject } from "react-router";
import { useQueryParamsStoreInit } from "store/RootStore/hooks";
import { rootStore } from "store/RootStore/instance";
import "styles/_styles.scss";

const App = () => {
  useQueryParamsStoreInit();

  return <Layout />;
};

const InitializeReposQueryParams = () => {
  useEffect(() => {
    if (rootStore.query.getParam("per_page") === undefined) {
      const searchParams = rootStore.query.updateQueryParam({ per_page: 6 });
      rootStore.query.setSearch(searchParams);
    }
    if (rootStore.query.getParam("page") === undefined) {
      const searchParams = rootStore.query.updateQueryParam({ page: 1 });
      rootStore.query.setSearch(searchParams);
    }
  }, []);

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
        element: (
          <>
            <InitializeReposQueryParams />
            <AllReposPage />
          </>
        ),
      },
      {
        path: routesConfig.repoDetail.mask,
        element: <RepoDetailPage />,
      },
      {
        path: routesConfig.users.mask,
        element: (
          <>
            <InitializeReposQueryParams />
            <AllUsersPage />
          </>
        ),
      },
      {
        path: routesConfig.userRepos.mask,
        element: (
          <AuthRoute>
            <InitializeReposQueryParams />
            <UserReposPage />
          </AuthRoute>
        ),
      },
      {
        path: routesConfig.userDetail.mask,
        element: <UserDetailPage />,
      },
      {
        path: routesConfig.login.mask,
        element: <LoginPage />,
      },
    ],
  },
];

export const router = createHashRouter(routes);

export default App;
