import cn from "classnames";
import { Text } from "components/Text";
import { UserLogo } from "components/UserLogo";
import { auth } from "config/firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router";
import { rootStore } from "store/RootStore";
import styles from "./SidePanel.module.scss";

interface SidePanelProps {
  className?: string;
  isOpen: boolean;
}

export const SidePanel: React.FC<SidePanelProps> = ({ className, isOpen }) => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        rootStore.auth.logout();
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <div className={cn(className, styles.panel, { [styles.open]: isOpen })}>
      <div className={styles.panel__content}>
        <div className={styles.panel__title}>
          <UserLogo />
          <Text>Link in</Text>
        </div>
        <ul className={styles.panel__menu}>
          <li>
            <Link className={styles.panel__link} to="#">
              <Text>Profile</Text>
            </Link>
          </li>
          <li>
            <Link className={styles.panel__link} to="#">
              <Text>Repositories</Text>
            </Link>
          </li>
          <li>
            <Link className={styles.panel__link} onClick={handleLogout} to="#">
              <Text>Log out</Text>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
