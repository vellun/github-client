import { useUserReposPageStore } from "App/pages/UserReposPage/context";
import cn from "classnames";
import { FiltersSection } from "components/FiltersSection";
import { Pagination } from "components/Pagination";
import { ReposSection } from "components/ReposSection";
import { Text } from "components/Text";
import { useParams } from "react-router";
import { useQueryParamsStoreInit } from "store/RootStore/hooks";
import { UserReposFiltersProvider, UserReposProvider } from "./provider";
import styles from "./UserReposPage.module.scss";
import { observer } from "mobx-react-lite";

const UserReposPageContent = observer(() => {
  const store = useUserReposPageStore();

  useQueryParamsStoreInit(store.query);

  return (
    <div className={cn("flex-container", styles.root)}>
      <Text className={styles.root__title} tag="h1" weight="bold" color="primary" view="title">
        List of user repositories
      </Text>

      <UserReposFiltersProvider>
        <FiltersSection />
      </UserReposFiltersProvider>
      <ReposSection store={store} />
      <Pagination store={store} />
    </div>
  );
});

export const UserReposPage = () => {
  const { login } = useParams<{ login: string }>();
  return (
    <UserReposProvider ownerLogin={login}>
      <UserReposPageContent />
    </UserReposProvider>
  );
};
