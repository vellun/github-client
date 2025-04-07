import styles from "./RepoLink.module.scss";
import linkIcon from "assets/icons/link.svg";
import { Text } from "components/Text";

const RepoLink = ({ repo }) => {
  if (!repo) {
    return null;
  }

  return (
    <div className={styles.RepoLinkContainer}>
      <img src={linkIcon} alt="Link Icon" width="16px" height="16px" />
      <a className={styles.RepoLink} href={repo.homepage}>
        <Text view="p-18" weight="bold">
          {repo.homepage}
        </Text>
      </a>
    </div>
  );
};

export default RepoLink;
