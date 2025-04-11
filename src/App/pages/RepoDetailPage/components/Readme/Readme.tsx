import { Loader } from "components/Loader";
import { Text } from "components/Text";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Meta } from "utils/meta";
import styles from "./Readme.module.scss";
import { RepoStore } from "store/ReposStore";

export const Readme: React.FC<{ store: RepoStore }> = observer(({ store }) => {
  const repoName = store.repo.name;
  const orgName = store.repo.owner.login;

  useEffect(() => {
    store.fetchReadme(orgName, repoName);
  }, [store, repoName, orgName]);

  return (
    <div className={styles.root}>
      {store.readmeMeta === Meta.loading && <Loader />}
      <Text className={styles.root__title} view="p-12" weight="bold" color="primary">
        README.md
      </Text>
      <div className={styles.root__content} dangerouslySetInnerHTML={{ __html: store.readme }} />
    </div>
  );
});
