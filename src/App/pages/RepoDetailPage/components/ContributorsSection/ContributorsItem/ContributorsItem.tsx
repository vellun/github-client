import { Text } from "components/Text";
import styles from "./ContributorsItem.module.scss";

interface ContributorsItemProps {
  login: string;
  avatarUrl: string;
  name?: string;
}

export const ContributorsItem: React.FC<ContributorsItemProps> = ({ login, avatarUrl, name }) => {
  return (
    <div className={styles.root}>
      <img className={styles.root__image} src={avatarUrl} alt="Contributor Avatar" width="32px" height="32px" />
      <Text className={styles.root__name} weight="bold" view="p-16">
        {login}
      </Text>
      <Text className={styles.root__name} weight="bold" view="p-16" color="secondary">
        {name}
      </Text>
    </div>
  );
};

