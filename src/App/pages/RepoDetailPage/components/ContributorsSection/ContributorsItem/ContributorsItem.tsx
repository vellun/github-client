import Text from "components/Text";
import styles from "./ContributorsItem.module.scss";

interface ContributorsItemProps {
  login: string;
  avatarUrl: string;
  name?: string;
}

const ContributorsItem: React.FC<ContributorsItemProps> = ({ login, avatarUrl, name }) => {
  return (
    <div className={styles.ContributorsItem}>
      <img className={styles.image} src={avatarUrl} alt="Contributor Avatar" width="32px" height="32px" />
      <Text className={styles.text} weight="bold" view="p-16">
        {login}
      </Text>
      <Text className={styles.text} weight="bold" view="p-16" color="secondary">
        {name}
      </Text>
    </div>
  );
};

export default ContributorsItem;
