import { Loader } from "components/Loader";
import { Text } from "components/Text";
import { observer, useLocalObservable } from "mobx-react-lite";
import { AllReposStore } from "store/ReposStore";
import { Meta } from "utils/meta";
import styles from "./AllReposPage.module.scss";
import { FiltersSection } from "./components/FiltersSection";
import { Pagination } from "./components/Pagination";
import { ReposSection } from "./components/ReposSection";

export const AllReposPage: React.FC = observer(() => {
  const repoStore = useLocalObservable(() => new AllReposStore());

  return (
    <div className={styles.root}>
      <Text className={styles.root__title} tag="h1" weight="bold" color="primary" view="title">
        List of organization repositories
      </Text>
      {<FiltersSection store={repoStore} />}

      <ReposSection store={repoStore} />
      {repoStore.meta === Meta.loading && <Loader />}

      <Pagination store={repoStore} />
    </div>
  );
});
