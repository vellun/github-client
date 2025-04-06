import githubLogo from "assets/icons/github-logo.svg";
import userLogo from "assets/icons/user-logo.svg";
import Text from "components/Text";
import cn from "classnames";

import styles from "./Navbar.module.scss";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className={cn(styles.root)}>
      <Link className="link" to={`/repositories`}>
        <div className={cn(styles.root__logo, styles.logo)}>
          <img src={githubLogo} alt="GitHub User Logo" width="32px" height="32px" />
          <Text weight="bold" view="p-20">
            GitHub Client
          </Text>
        </div>
      </Link>
      <img src={userLogo} alt="GitHub Logo" width="32px" height="32px" />
    </div>
  );
};

export default Navbar;
