import { RouteObject } from "react-router";
import App from "App";
import AllRepsPage from "App/pages/AllRepsPage";
import RepoDetailPage from "App/pages/RepoDetailPage";

export const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/repositories",
        element: <AllRepsPage />,
      },
      {
        path: "/repositories/:repoName",
        element: <RepoDetailPage />,
      },
    ],
  },
];
