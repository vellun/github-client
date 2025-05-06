import { Filters } from "./Filters";
import styles from "./FiltersSection.module.scss";
import { Search } from "./Search";

export const FiltersSection = () => {
  return (
    <div className={styles.root}>
      <Filters />
      <Search />
    </div>
  );
};
