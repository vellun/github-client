import AuthService from "api/AuthService";
import cn from "classnames";
import { Button } from "components/Button";
import { GhLogo } from "components/icons/GhLogo";
import { Text } from "components/Text";
import { routesConfig } from "config/routes";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.scss";

export const LoginPage = observer(() => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    await AuthService.login();
    navigate(routesConfig.repositories.create());
  };

  return (
    <div className={cn("flex-container", styles.root)}>
      <div className={cn("flex-container", "form", styles.root__form)}>
        <GhLogo width="32px" height="32px" />
        <Text className={styles.root__title} tag="h1" weight="bold" color="primary">
          GitHub Authorization
        </Text>
        <Button onClick={handleLogin}>Log in</Button>
      </div>
    </div>
  );
});
