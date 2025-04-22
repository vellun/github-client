import cn from "classnames";
import { FiltersSection } from "components/FiltersSection";
import { Pagination } from "components/Pagination";
import { Text } from "components/Text";
import { observer } from "mobx-react-lite";
import styles from "./AllUsersPage.module.scss";
import { UsersSection } from "./components/UsersSection";
import { useUsersPageStore } from "./context";
import { UsersFiltersProvider, UsersProvider } from "./provider";

const AllUsersPageContent: React.FC = observer(() => {
  const store = useUsersPageStore();

  return (
    <div className={cn("container", styles.root)}>
      <Text className={styles.root__title} tag="h1" weight="bold" color="primary" view="title">
        List of users
      </Text>

      <UsersFiltersProvider><FiltersSection /></UsersFiltersProvider>

      <UsersSection store={store} />

      <Pagination store={store} />
    </div>
  );
});

export const AllUsersPage = () => {
  return (
    <UsersProvider>
      <AllUsersPageContent />
    </UsersProvider>
  );
};