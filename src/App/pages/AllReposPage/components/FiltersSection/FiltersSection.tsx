import { useReposPageStore } from "App/pages/AllReposPage/context";
import { observer } from "mobx-react-lite";
import { Filters } from "./Filters";
import styles from "./FiltersSection.module.scss";
import { Search } from "./Search";

export const FiltersSection = observer(() => {
  const store = useReposPageStore();

  return (
    <div className={styles.root}>
      <Search store={store} />
      <Filters />
    </div>
  );
});
