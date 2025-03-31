import ArrowDownIcon from "components/icons/ArrowDownIcon";
import Text from "components/Text";
import styles from "./titleSection.module.scss";

const TitleSection = ({ repo }) => {
  if (!repo) {
    return null;
  }
  return (
    <div className={styles.titleSection}>
      <ArrowDownIcon className={styles.titleArrowIcon} width={32} height={32}></ArrowDownIcon>
      <img
        className={styles.titleImage}
        src={repo.owner.avatar_url}
        alt="GitHub Repo Logo"
        width="40px"
        height="40px"
      />
      <Text tag="h1" weight="bold" color="primary" view="title">
        {repo.name}
      </Text>
    </div>
  );
};

export default TitleSection;
