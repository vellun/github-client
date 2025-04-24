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

export const Navbar = observer(() => {
  const [active, setActive] = useState<string>("repos");

  return (
    <div className={cn(styles.navbar)}>
      <input type="checkbox" id="showSide" className={styles.panel__check} />
      <Link className="link" to={`/`}>
        <div className={cn(styles.navbar__logo, styles.logo)}>
          <img src={githubLogo} alt="GitHub User Logo" width="32px" height="32px" />
          <Text weight="bold" view="p-20">
            GitHub Client
          </Text>
        </div>
      </Link>
      <div className={styles.navbar__menu}>
        <Link id="repos" className="link" to={`/`}>
          <Text weight="medium" view="p-18">
            Repositories
          </Text>
        </Link>
        <Link id="users" className="link" to={`/users`}>
          <Text weight="medium" view="p-18">
            Users
          </Text>
        </Link>
      </div>
      <div>
        {rootStore.auth.isAuth ? (
          <Link to={routesConfig.login.create()}>
            <label for="showSide">
              <UserLogo alt="User Avatar" />
            </label>
          </Link>
        ) : (
          <Link className="link" to={routesConfig.login.create()}>
            <Button>Log in</Button>
          </Link>
        )}
      </div>
    </div>
  );
});
