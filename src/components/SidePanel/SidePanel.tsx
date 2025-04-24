import cn from "classnames";
import { Text } from "components/Text";
import { UserLogo } from "components/UserLogo";
import { auth } from "config/firebase";
import { routesConfig } from "config/routes";
import { signOut } from "firebase/auth";
import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router";
import { rootStore } from "store/RootStore";
import styles from "./SidePanel.module.scss";

interface SidePanelProps {
  className?: string;
  isOpen: boolean;
}

export const SidePanel: React.FC<SidePanelProps> = observer(({ className, isOpen }) => {
  const navigate = useNavigate();
  const curUser = rootStore.auth.user?.login;

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        rootStore.auth.logout();
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });

    navigate(routesConfig.login.create());
  };

  return (
    <div className={cn(className, styles.panel, { [styles.open]: isOpen })}>
      <div className={styles.panel__content}>
        <Link className={cn("link", styles.panel__link)} to={routesConfig.userDetail.create(curUser)}>
          <div className={styles.panel__title}>
            <UserLogo src={rootStore.auth.user?.avatarUrl} alt="Current User Avatar" />
            <Text className="noMarginText">{curUser}</Text>
          </div>
        </Link>

        <ul className={styles.panel__menu}>
          <li>
            <Link className={cn("link", styles.panel__link)} to={routesConfig.userDetail.create(curUser)}>
              <Text className="noMarginText">Profile</Text>
            </Link>
          </li>
          <li>
            <Link className={cn("link", styles.panel__link)} to={routesConfig.userRepos.create(curUser)}>
              <Text className="noMarginText">Repositories</Text>
            </Link>
          </li>
          <li>
            <Link className={cn("link", styles.panel__link)} onClick={handleLogout} to="#">
              <Text className={cn("noMarginText")}>Log out</Text>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
});
