import { Loader } from "components/Loader";
import { Text } from "components/Text";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { RepoStore } from "store/ReposStore";
import { Meta } from "utils/meta";
import { ContributorsItem } from "../ContributorsItem";
import styles from "./ContributorsSection.module.scss";

export const ContributorsSection: React.FC<{ store: RepoStore }> = observer(({ store }) => {
  const repoName = store.repo.name;
  const orgName = store.repo.owner.login;

  useEffect(() => {
    store.fetchContributors(orgName, repoName);
  }, [store, repoName, orgName]);

  const contributors = store.contributors;

  return (
    <div className={styles.root}>
      {store.contributorsMeta === Meta.loading && <Loader />}
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
        return <ContributorsItem key={index} login={contributor.login} avatarUrl={contributor.avatarUrl} />;
      })}
    </div>
  );
});
