import styles from "./RepoLink.module.scss";
import linkIcon from "assets/icons/link.svg";
import { Text } from "components/Text";
import { observer } from "mobx-react-lite";

export const RepoLink = observer(({ repo }) => {
  return (
    <div className={styles.root}>
      <img src={linkIcon} alt="Link Icon" width="16px" height="16px" />
      <a className={styles.root__link} href={repo.homepage}>
        <Text view="p-18" weight="bold">
          {repo.homepage}
        </Text>
      </a>
    </div>
  );
});
