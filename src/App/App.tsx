import { AllReposPage } from "App/pages/AllReposPage";
import { AllUsersPage } from "App/pages/AllUsersPage";
import { CreateRepoPage } from "App/pages/CreateRepoPage";
import { LoginPage } from "App/pages/LoginPage";
import { RepoDetailPage } from "App/pages/RepoDetailPage";
import { UserDetailPage } from "App/pages/UserDetailPage";
import { UserReposPage } from "App/pages/UserReposPage";
import { AuthRoute } from "components/AuthRoute";
import { Layout } from "components/Layout";
import { routesConfig } from "config/routes";
import { createHashRouter, Navigate, RouteObject } from "react-router";
import "styles/styles.scss";

const App = () => {
  return <Layout />;
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
      {
        path: routesConfig.users.mask,
        element: <AllUsersPage />,
      },
      {
        path: routesConfig.userRepos.mask,
        element: <UserReposPage />,
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
