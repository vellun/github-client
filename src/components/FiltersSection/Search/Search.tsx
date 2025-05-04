import searchLogo from "assets/icons/search.svg";
import { Button } from "components/Button";
import { useFiltersContext, useFilterStore } from "components/FiltersSection/context";
import { Input } from "components/Input";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import styles from "./Search.module.scss";

export const Search = observer(() => {
  const context = useFiltersContext();
  const store = useFilterStore();
  const pageStore = context?.pageStore;

  useEffect(() => {
    return () => {
      store.setSearch("", null);
    };
  }, [store]);

  const handleInputChange = (value: string) => {
    store?.setSearch(value, context.filterType);
  };

  const handleButtonClick = () => {
    pageStore?.fetch();
    pageStore?.pagination.setPage(1);
  };

  return (
    <div className={styles.search}>
      <Input
        className={styles.search__input}
        value={store.search}
        onChange={handleInputChange}
        placeholder={context?.inputPlaceholder}
      ></Input>
      <Button onClick={handleButtonClick}>
        <img src={searchLogo} alt="Search Icon" width="24px" height="24px" />
      </Button>
    </div>
  );
});
