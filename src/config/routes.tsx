import { RouteObject } from "react-router";
import App from "App";
import AllRepsPage from "App/pages/AllRepsPage";
import RepDetailPage from "App/pages/RepDetailPage";

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
        path: "/repositories/:id",
        element: <RepDetailPage />,
      },
    ],
  },
];
