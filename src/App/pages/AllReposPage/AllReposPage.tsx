import cn from "classnames";
import { FiltersSection } from "components/FiltersSection";
import { MiniReposSection } from "components/MiniReposSection";
import { Pagination } from "components/Pagination";
import { ReposSection } from "components/ReposSection";
import { Text } from "components/Text";
import { observer } from "mobx-react-lite";
import { useQueryParamsStoreInit } from "store/RootStore/hooks";
import { getViewedRepos } from "utils/viewedRepos";
import styles from "./AllReposPage.module.scss";
import { useReposPageStore } from "./context";
import { ReposFiltersProvider, ReposProvider } from "./provider";
import { toast } from "react-toastify";

const AllReposPageContent: React.FC = observer(() => {
  const store = useReposPageStore();
  const lastSeenRepos = getViewedRepos();

  useQueryParamsStoreInit(store.query);

  return (
    <div className={cn("flex-container", styles.root)}>
      {lastSeenRepos.length !== 0 && (
        <>
          <Text className={styles.title} color="primary" weight="medium" view="p-20" maxLines={2}>
            Last seen repositories
          </Text>
          <MiniReposSection className={styles["last-seen-repos"]} repos={lastSeenRepos} />
        </>
      )}

      <Text className={styles.root__title} tag="h1" weight="bold" color="primary" view="title">
        List of organization repositories
      </Text>

      <ReposFiltersProvider>
        <FiltersSection />
      </ReposFiltersProvider>

      <ReposSection store={store} />

      <Pagination store={store} />
    </div>
  );
});

export const AllReposPage = () => {
  return (
    <ReposProvider>
      <AllReposPageContent />
    </ReposProvider>
  );
};
