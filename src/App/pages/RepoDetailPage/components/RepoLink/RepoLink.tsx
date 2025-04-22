import styles from "./RepoLink.module.scss";
import linkIcon from "assets/icons/link.svg";
import { Text } from "components/Text";
import { observer } from "mobx-react-lite";
import { Link } from "react-router";

export const RepoLink = observer(({ repo }) => {
  return (
    <div className={styles.root}>
      <img src={linkIcon} alt="Link Icon" width="16px" height="16px" />
      <Link className={styles.root__link} to={repo.homepage}>
        <Text view="p-18" weight="bold">
          {repo.homepage}
        </Text>
      </Link>
    </div>
  );
});
