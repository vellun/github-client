import AuthService from "api/AuthService";
import cn from "classnames";
import { Text } from "components/Text";
import { routesConfig } from "config/routes";
import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router";
import { rootStore } from "store/RootStore";
import styles from "./SidePanel.module.scss";

interface SidePanelProps {
  className?: string;
  titleSlot?: React.ReactNode;
  close: () => void;
}

export const SidePanel: React.FC<SidePanelProps> = observer(({ className, titleSlot, close }) => {
  const navigate = useNavigate();

  let curUser = "";
  if (rootStore.auth.user !== undefined && rootStore.auth.user !== null) {
    curUser = rootStore.auth.user.login;
  }

  const handleLogout = () => {
    AuthService.logout();
    navigate(routesConfig.login.create());
  };

  return (
    <div className={cn(className, styles.panel)}>
      <div className={styles.panel__content}>
        <div className={styles.panel__title}>
          {titleSlot}
          <button onClick={close} className={styles.panel__close}>
            +
          </button>
        </div>

        <ul className={styles.panel__menu}>
          <li>
            <Link
              onClick={close}
              className={cn("link", styles.panel__link)}
              to={routesConfig.userDetail.create(curUser)}
            >
              <Text className="noMarginText">Profile</Text>
            </Link>
          </li>
          <li>
            <Link
              onClick={close}
              className={cn("link", styles.panel__link)}
              to={routesConfig.userRepos.create(curUser)}
            >
              <Text className="noMarginText">Repositories</Text>
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                handleLogout();
                close();
              }}
              className={cn("link", styles.panel__link)}
              to="#"
            >
              <Text className={cn("noMarginText")}>Log out</Text>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
});
