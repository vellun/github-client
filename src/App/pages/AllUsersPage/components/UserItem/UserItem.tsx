import { Button } from "components/Button";
import { Text } from "components/Text";
import { UserLogo } from "components/UserLogo";
import { routesConfig } from "config/routes";
import { Link } from "react-router";
import styles from "./UserItem.module.scss";

type UserItem = {
  login: string;
  avatarUrl: string;
  type: string;
};

export const UserItem = ({ login, avatarUrl, type }: UserItem) => {
  return (
    <div className={styles.user}>
      <div className={styles.user__title}>
        <UserLogo alt="User Avatar" src={avatarUrl} />
        <Text color="primary" view="p-18" weight="medium">
          {login}
        </Text>
        <Text color="secondary">{type}</Text>
      </div>

      <Link className="link" to={routesConfig.userRepos.create(login)}>
        <Button>Repositories</Button>
      </Link>
    </div>
  );
};
