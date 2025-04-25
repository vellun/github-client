import { ReposFiltersProvider, ReposProvider } from "App/pages/AllReposPage";
import { useReposPageStore } from "App/pages/AllReposPage/context";
import cn from "classnames";
import { FiltersSection } from "components/FiltersSection";
import { Pagination } from "components/Pagination";
import { ReposSection } from "components/ReposSection";
import { Text } from "components/Text";
import { useParams } from "react-router";
import styles from "./UserReposPage.module.scss";

const UserReposPageContent = () => {
  const store = useReposPageStore();

  return (
    <div className={cn("container", styles.root)}>
      <Text className={styles.root__title} tag="h1" weight="bold" color="primary" view="title">
        List of user repositories
      </Text>

      <ReposFiltersProvider type="user">
        <FiltersSection />
      </ReposFiltersProvider>
      <ReposSection store={store} />
      <Pagination store={store} />
    </div>
  );
};

export const UserReposPage = () => {
  const { login } = useParams<{ login: string }>();
  return (
    <ReposProvider type="user" ownerLogin={login}>
      <UserReposPageContent />
    </ReposProvider>
  );
};
