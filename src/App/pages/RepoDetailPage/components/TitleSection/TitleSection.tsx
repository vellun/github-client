import { ArrowDownIcon } from "components/icons/ArrowDownIcon";
import { Text } from "components/Text";
import styles from "./titleSection.module.scss";
import { observer } from "mobx-react-lite";

interface TitleSectionProps {
  avatarUrl?: string;
  repoName: string;
}

export const TitleSection: React.FC<TitleSectionProps> = observer(({ avatarUrl, repoName }) => {
  return (
    <div className={styles.root}>
      <ArrowDownIcon className={styles.root__icon} width={32} height={32}></ArrowDownIcon>
      <img className={styles.root__image} src={avatarUrl} alt="GitHub Repo Logo" width="40px" height="40px" />
      <Text tag="h1" weight="bold" color="primary" view="title">
        {repoName}
      </Text>
    </div>
  );
});
