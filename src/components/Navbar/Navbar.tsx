import githubLogo from "assets/icons/github-logo.svg";
import cn from "classnames";
import { Text } from "components/Text";

import { UserLogo } from "components/UserLogo";
import { useState } from "react";
import { Link } from "react-router";
import styles from "./Navbar.module.scss";
import { routesConfig } from "config/routes";
import { rootStore } from "store/RootStore";
import { Button } from "components/Button";
import { observer } from "mobx-react-lite";
import { ThemeToggler } from "./components/ThemeToggler";

interface NavbarProps {
  openSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = observer(({ openSidebar }) => {
  const [active, setActive] = useState<string>("repos");

  return (
    <div className={cn(styles.navbar)}>
      <input type="checkbox" id="showSide" className={styles.panel__check} />
      <Link className="link" to={`/`}>
        <div className={cn(styles.navbar__logo, styles.logo)}>
          <img src={githubLogo} alt="GitHub User Logo" width="32px" height="32px" />
          <Text className={styles["navbar__logo-text"]} weight="bold" view="p-20">
            GitHub Client
          </Text>
        </div>
      </Link>
      <div className={styles.navbar__menu}>
        <Link id="repos" className="link" to={`/`} onClick={() => setActive("repos")}>
          <Text weight="medium" view="p-18" color={active === "repos" ? "accent": "primary"}>
            Repositories
          </Text>
        </Link>
        <Link id="users" className="link" to={`/users`} onClick={() => setActive("users")}>
          <Text weight="medium" view="p-18" color={active === "users" ? "accent": "primary"}>
            Users
          </Text>
        </Link>
      </div>
      <div>
        {rootStore.auth.isAuth ? (
          <button onClick={openSidebar}>
            <UserLogo src={rootStore.auth.user?.avatarUrl} alt="Current User Avatar" />
          </button>
        ) : (
          <Link className="link" to={routesConfig.login.create()}>
            <Button>Log in</Button>
          </Link>
        )}
        <ThemeToggler />
      </div>
    </div>
  );
});
