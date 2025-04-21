import cn from "classnames";
import { Loader } from "components/Loader";
import { Pagination } from "components/Pagination";
import { Text } from "components/Text";
import { observer } from "mobx-react-lite";
import { Meta } from "utils/meta";
import styles from "./AllReposPage.module.scss";
import { FiltersSection } from "components/FiltersSection";
import { ReposSection } from "../../../components/ReposSection";
import { useReposPageStore } from "./context";
import { ReposFiltersProvider, ReposProvider } from "./provider";

const AllReposPageContent: React.FC = observer(() => {
  const store = useReposPageStore();

  return (
    <div className={cn("container", styles.root)}>
      <Text className={styles.root__title} tag="h1" weight="bold" color="primary" view="title">
        List of organization repositories
      </Text>

      <ReposFiltersProvider type="org"><FiltersSection /></ReposFiltersProvider>

      <ReposSection store={store} />
      {store.meta === Meta.loading && <Loader />}

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
