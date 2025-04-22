import cn from "classnames";
import { FiltersSection } from "components/FiltersSection";
import { Loader } from "components/Loader";
import { MiniReposSection } from "components/MiniReposSection";
import { Pagination } from "components/Pagination";
import { Text } from "components/Text";
import { observer } from "mobx-react-lite";
import { Meta } from "utils/meta";
import { getViewedRepos } from "utils/viewedRepos";
import { ReposSection } from "../../../components/ReposSection";
import styles from "./AllReposPage.module.scss";
import { useReposPageStore } from "./context";
import { ReposFiltersProvider, ReposProvider } from "./provider";

const AllReposPageContent: React.FC = observer(() => {
  const store = useReposPageStore();
  const lastSeenRepos = getViewedRepos();

  return (
    <div className={cn("flex-container", styles.root)}>
      {lastSeenRepos.length !== 0 &&
        <><Text className={styles.title} weight="medium" view="p-20" maxLines={2}>Last seen repositories</Text>
          <MiniReposSection repos={lastSeenRepos} /></>}

      <Text className={styles.root__title} tag="h1" weight="bold" color="primary" view="title">
        List of organization repositories
      </Text>

      <ReposFiltersProvider type="org"><FiltersSection /></ReposFiltersProvider>

      <ReposSection store={store} />


      <Pagination store={store} />
    </div>
  );
});

export const AllReposPage = () => {
  return (
    <ReposProvider type="org">
      <AllReposPageContent />
    </ReposProvider>
  );
};
