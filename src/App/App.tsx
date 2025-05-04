import { CreateRepoPage } from "App/pages/CreateRepoPage";
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
    rootStore.query.initParams();
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
          <>
            <InitializeReposQueryParams />
            <UserReposPage />
          </>
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
      {
        path: routesConfig.createRepo.mask,
        element: (
          <AuthRoute>
            <CreateRepoPage />
          </AuthRoute>
        ),
      },
    ],
  },
];

export const router = createHashRouter(routes);

export default App;
