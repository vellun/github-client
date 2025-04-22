import { Loader } from "components/Loader";
import { Text } from "components/Text";
import { observer } from "mobx-react-lite";
import { RepoStore } from "store";
import { Meta } from "utils/meta";
import styles from "./Readme.module.scss";

export const Readme: React.FC<{ store: RepoStore }> = observer(({ store }) => {
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
