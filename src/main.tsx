import { router } from "App/router";
import "config/configureMobX";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import './styles/themes.css';

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
