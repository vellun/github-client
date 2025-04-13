import { Loader } from "components/Loader";
import { Text } from "components/Text";
import { observer } from "mobx-react-lite";
import { Meta } from "utils/meta";
import styles from "./AllReposPage.module.scss";
import { FiltersSection } from "./components/FiltersSection";
import { Pagination } from "./components/Pagination";
import { ReposSection } from "./components/ReposSection";
import { useReposPageStore } from "./context";
import { ReposProvider } from "./provider";

const AllReposPageContent: React.FC = observer(() => {
  const store = useReposPageStore();

  return (
    <div className={styles.root}>
      <Text className={styles.root__title} tag="h1" weight="bold" color="primary" view="title">
        List of organization repositories
      </Text>
      <FiltersSection />

      <ReposSection store={store} />
      {store.meta === Meta.loading && <Loader />}

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
