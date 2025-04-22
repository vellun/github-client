import { UserDetailPage } from "App/pages/UserDetailPage";
import { AllReposPage } from "App/pages/AllReposPage";
import { AllUsersPage } from "App/pages/AllUsersPage";
import { RepoDetailPage } from "App/pages/RepoDetailPage";
import { Layout } from "components/Layout";
import { routesConfig } from "config/routes";
import { createBrowserRouter, Navigate, RouteObject } from "react-router";
import { useQueryParamsStoreInit } from "store/RootStore/hooks";
import { rootStore } from "store/RootStore/instance";
import "styles/_styles.scss";
import { UserReposPage } from "App/pages/UserReposPage";
import { LoginPage } from "App/pages/LoginPage";
import { RegisterPage } from "App/pages/RegisterPage";

const App = () => {
  useQueryParamsStoreInit()

  return (
    <Layout />
  );
};

const InitializeReposQueryParams = () => {
  if (rootStore.query.getParam("page") === undefined) {
    const searchParams = rootStore.query.updateQueryParam({ page: 1 });
    rootStore.query.setSearch(searchParams)
  }

  if (rootStore.query.getParam("per_page") === undefined) {
    const searchParams = rootStore.query.updateQueryParam({ per_page: 6 });
    rootStore.query.setSearch(searchParams)
  }

  return null
}

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
        element: <><InitializeReposQueryParams /><AllReposPage /></>,
      },
      {
        path: routesConfig.repoDetail.mask,
        element: <RepoDetailPage />,
      },
      {
        path: routesConfig.users.mask,
        element: <><InitializeReposQueryParams /><AllUsersPage /></>
      },
      {
        path: routesConfig.userRepos.mask,
        element: <><InitializeReposQueryParams /><UserReposPage /></>
      },
      {
        path: routesConfig.userDetail.mask,
        element: <UserDetailPage />
      },
      {
        path: routesConfig.login.mask,
        element: <LoginPage />
      },
      {
        path: routesConfig.register.mask,
        element: <RegisterPage />
      },
    ],
  },
  {
    // TODO: 404 page
  },
];

export const router = createBrowserRouter(routes);

export default App;
