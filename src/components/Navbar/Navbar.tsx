import cn from "classnames";
import { Text } from "components/Text";

import { Button } from "components/Button";
import { GhLogo } from "components/icons/GhLogo";
import { UserLogo } from "components/UserLogo";
import { routesConfig } from "config/routes";
import { observer } from "mobx-react-lite";
import { Link } from "react-router";
import { rootStore } from "store/RootStore";
import { ThemeToggler } from "./components/ThemeToggler";
import styles from "./Navbar.module.scss";

interface NavbarProps {
  openSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = observer(({ openSidebar }) => {
  return (
    <div className={cn(styles.navbar)}>
      <input type="checkbox" id="showSide" className={styles.panel__check} />
      <Link className="link" to={`/`}>
        <div className={cn(styles.navbar__logo, styles.logo)}>
          <GhLogo width="32px" height="32px" />
          <Text className={styles["navbar__logo-text"]} color="primary" weight="bold" view="p-20">
            GitHub Client
          </Text>
        </div>
      </Link>
      <div className={styles.navbar__menu}>
        <Link id="repos" className="link" to={`/`}>
          <Text weight="medium" view="p-18" color="primary">
            Repositories
          </Text>
        </Link>
        <Link id="users" className="link" to={`/users`}>
          <Text weight="medium" view="p-18" color="primary">
            Users
          </Text>
        </Link>
      </div>
      <div className={styles["navbar__side-menu"]}>
        <ThemeToggler />
        {rootStore.auth.isAuth ? (
          <button onClick={openSidebar}>
            <UserLogo src={rootStore.auth.user?.avatarUrl} alt="Current User Avatar" />
          </button>
        ) : (
          <Link className="link" to={routesConfig.login.create()}>
            <Button>Log in</Button>
          </Link>
        )}
      </div>
    </div>
  );
});
