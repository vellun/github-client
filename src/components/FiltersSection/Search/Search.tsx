import searchLogo from "assets/icons/search.svg";
import { Button } from "components/Button";
import { useFiltersContext, useSearchStore } from "components/FiltersSection/context";
import { Input } from "components/Input";
import { observer } from "mobx-react-lite";
import { FiltersType } from "store/RootStore";
import styles from "./Search.module.scss";
import { useEffect } from "react";

export const Search = observer(() => {
  const context = useFiltersContext()
  const store = useSearchStore()
  const pageStore = context?.pageStore

  useEffect(() => {
    return () => { store?.setSearch(""); }
  }, []);

  const handleInputChange = (value: string) => {
    if (context?.filterType === FiltersType.repos) {
      store?.setReposSearch(value);
    }

    if (context?.filterType === FiltersType.users) {
      store?.setUsersSearch(value);
    }
  };

  const handleButtonClick = () => {
    pageStore?.fetch();
    pageStore?.pagination.setPage(1)
  };

  return (
    <div className={styles.search}>
      <Input
        className={styles.search__input}
        value={store.search}
        onChange={handleInputChange}
        placeholder="Enter organization name"
      ></Input>
      <Button onClick={handleButtonClick}>
        <img src={searchLogo} alt="Search Icon" width="24px" height="24px" />
      </Button>
    </div>
  );
});
