import { routesConfig } from "config/routes";
import { observer } from "mobx-react-lite";
import { Navigate, useLocation } from "react-router-dom";
import { rootStore } from "store/RootStore";

export const AuthRoute = observer(({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { isAuth } = rootStore.auth;

  if (!isAuth) {
    return <Navigate to={routesConfig.login.create()} state={{ from: location }} replace />;
  }

  return children;
});
