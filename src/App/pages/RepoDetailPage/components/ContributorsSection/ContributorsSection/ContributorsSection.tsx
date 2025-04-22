import { Loader } from "components/Loader";
import { Text } from "components/Text";
import { observer } from "mobx-react-lite";
import { RepoStore } from "store/RepoStore";
import { Meta } from "utils/meta";
import { ContributorsItem } from "../ContributorsItem";
import styles from "./ContributorsSection.module.scss";
import { Link } from "react-router";

export const ContributorsSection: React.FC<{ store: RepoStore }> = observer(({ store }) => {
  const contributorsCnt = store.contributors?.length
  const contributors = store.contributors?.slice(0, 4);

  return (
    <div className={styles.root}>
      {store.contributorsMeta === Meta.loading && <Loader />}
      <div className={styles.root__section}>
        <Text className={styles.root__title} view="p-18" weight="bold" color="primary">
          Contributors
        </Text>
        <div className={styles.root__count}>
          <Text className={styles["root__count-text"]} tag="span" weight="bold">
            {contributorsCnt}
          </Text>
        </div>
      </div>
      {contributors.map((contributor) => {
        return <ContributorsItem key={contributor.id} login={contributor.login} avatarUrl={contributor.avatarUrl} />;
      })}
      {contributorsCnt - 4 > 0 && <Link><Text>+ {contributorsCnt - 4} contributors</Text></Link>}
    </div>
  );
});
