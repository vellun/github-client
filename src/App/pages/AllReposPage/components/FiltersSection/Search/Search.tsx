import searchLogo from "assets/icons/search.svg";
import { Button } from "components/Button";
import { Input } from "components/Input";
import { observer, useLocalObservable } from "mobx-react-lite";
import { AllReposStore } from "store/AllReposStore";
import { SearchStore } from "store/RootStore/SearchStore";
import styles from "./Search.module.scss";

export const Search = observer(({ store }: { store: AllReposStore }) => {
  const searchStore = useLocalObservable(() => new SearchStore());

  const handleInputChange = (value: string) => {
    searchStore.setSearch(value);
  };

  const handleButtonClick = () => {
    store.fetch();
  };

  return (
    <div className={styles.search}>
      <Input
        className={styles.search__input}
        value={searchStore.search}
        onChange={handleInputChange}
        placeholder="Enter organization name"
      ></Input>
      <Button onClick={handleButtonClick}>
        <img src={searchLogo} alt="Search Icon" width="24px" height="24px" />
      </Button>
    </div>
  );
});
