import { ArrowDownIcon } from "components/icons/ArrowDownIcon";
import { Text } from "components/Text";
import { useNavigate } from "react-router";
import styles from "./titleSection.module.scss";

interface TitleSectionProps {
  avatarUrl?: string;
  repoName: string;
}

export const TitleSection: React.FC<TitleSectionProps> = ({ avatarUrl, repoName }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.root}>
      <button className={styles.root__button} onClick={handleGoBack}>
        <ArrowDownIcon className={styles.root__icon} width={32} height={32}></ArrowDownIcon>
      </button>
      <img className={styles.root__image} src={avatarUrl} alt="GitHub Repo Logo" width="40px" height="40px" />
      <Text tag="h1" weight="bold" color="primary" view="title">
        {repoName}
      </Text>
    </div>
  );
};
