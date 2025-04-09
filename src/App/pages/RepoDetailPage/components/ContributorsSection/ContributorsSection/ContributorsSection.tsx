import UsersService, { Contributor } from "api/UsersService";
import { Text } from "components/Text";
import { useFetching } from "hooks/useFetching";
import { useEffect, useState } from "react";
import { ContributorsItem } from "../ContributorsItem";
import styles from "./ContributorsSection.module.scss";

interface ContributorsProps {
  repoName: string;
}

export const ContributorsSection: React.FC<ContributorsProps> = ({ repoName }) => {
  const [contributors, setContributors] = useState<Contributor[]>([]);

  const [fetchContributors, _] = useFetching(async (): Promise<void> => {
    const contributors = await UsersService.getContributors(repoName);
    setContributors(contributors);
  });

  useEffect(() => {
    fetchContributors();
  }, [fetchContributors]);

  return (
    <div className={styles.root}>
      <div className={styles.root__section}>
        <Text className={styles.root__title} view="p-18" weight="bold" color="primary">
          Contributors
        </Text>
        <div className={styles.root__count}>
          <Text className={styles["root__count-text"]} tag="span" weight="bold">
            {contributors.length}
          </Text>
        </div>
      </div>
      {contributors.map((contributor, index) => {
        return <ContributorsItem key={index} login={contributor.login} avatarUrl={contributor.avatar_url} />;
      })}
    </div>
  );
};
