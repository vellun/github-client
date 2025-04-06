import App from "App/App";
import AllReposPage from "App/pages/AllReposPage";
import RepoDetailPage from "App/pages/RepoDetailPage";
import { Navigate, RouteObject } from "react-router";

export const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/repositories" replace />,
      },
      {
        path: "/repositories",
        element: <AllReposPage />,
      },
      {
        path: "/repositories/:repoName",
        element: <RepoDetailPage />,
      },
    ],
  },
];
