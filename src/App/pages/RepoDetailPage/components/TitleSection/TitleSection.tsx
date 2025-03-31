import ktsCat from "assets/images/kts-cat.png";
import ArrowDownIcon from "components/icons/ArrowDownIcon";
import Text from "components/Text";
import styles from "./titleSection.module.scss";

const TitleSection = ({ repo }) => {
  return (
    <div className={styles.titleSection}>
      <ArrowDownIcon className={styles.titleArrowIcon} width={32} height={32}></ArrowDownIcon>
      <img className={styles.titleImage} src={ktsCat} alt="GitHub User Logo" width="40px" height="40px" />
      <Text tag="h1" weight="bold" color="primary" view="title">
        kts-school-frontend
        {/* {repo.name} */}
      </Text>
    </div>
  );
};

export default TitleSection;
