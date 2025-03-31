import githubLogo from "assets/icons/github-logo.svg";
import userLogo from "assets/icons/user-logo.svg";
import Text from "components/Text";
import cn from "classnames";

import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <div className={cn(styles.navbar)}>
      <div className={cn(styles.navbarLogo)}>
        <img src={githubLogo} alt="GitHub Logo" width="32px" height="32px" />
        <Text weight="bold" view="p-20">
          GitHub Client
        </Text>
      </div>
      <img src={userLogo} alt="GitHub Logo" width="32px" height="32px" />
    </div>
  );
};

export default Navbar;
