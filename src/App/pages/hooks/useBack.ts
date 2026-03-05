import { routesConfig } from "config/routes";
import { useLocation, useNavigate } from "react-router-dom";

export const useBack = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const mainPath = routesConfig.repositories.create();

  const back = () => {
    if (location.key === "default") {
      navigate(mainPath);
    } else {
      navigate(-1);
    }
  };

  return back;
};
