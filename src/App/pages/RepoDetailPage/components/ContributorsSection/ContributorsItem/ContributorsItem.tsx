import { UserLogo } from "components/UserLogo";
import { Text } from "components/Text";
import styles from "./ContributorsItem.module.scss";
import { Link } from "react-router";
import { routesConfig } from "config/routes";

interface ContributorsItemProps {
  login: string;
  avatarUrl: string;
  name?: string;
}

export const ContributorsItem: React.FC<ContributorsItemProps> = ({ login, avatarUrl, name }) => {
  return (
    <Link className="link" to={routesConfig.userDetail.create(login)}>
      <div className={styles.root}>
        <UserLogo src={avatarUrl} alt="Contributor Avatar" />
        <Text className={styles.root__name} color="primary" weight="bold" view="p-16">
          {login}
        </Text>
        <Text className={styles.root__name} weight="bold" view="p-16" color="secondary">
          {name}
        </Text>
      </div>
    </Link>
  );
};

