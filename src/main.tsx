import { router } from "App/App";
import "config/configureMobX";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
