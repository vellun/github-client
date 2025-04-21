import { Loader } from "components/Loader";
import { Text } from "components/Text";
import { observer } from "mobx-react-lite";
import { RepoStore } from "store/RepoStore";
import { Meta } from "utils/meta";
import { ContributorsItem } from "../ContributorsItem";
import styles from "./ContributorsSection.module.scss";

export const ContributorsSection: React.FC<{ store: RepoStore }> = observer(({ store }) => {
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
      {contributors.map((contributor) => {
        return <ContributorsItem key={contributor.id} login={contributor.login} avatarUrl={contributor.avatarUrl} />;
      })}
    </div>
  );
});
