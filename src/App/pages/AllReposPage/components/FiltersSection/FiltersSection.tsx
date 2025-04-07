import searchLogo from "assets/icons/search.svg";
import Button from "components/Button";
import { Input } from "components/Input";
import { MultiDropdown, Option } from "components/MultiDropdown";
import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { GithubAllReposStore } from "store/GithubStore";
import rootStore from "store/RootStore";
import styles from "./FiltersSection.module.scss";

export const FiltersSection = observer(({ store }: { store: GithubAllReposStore }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState<string>(rootStore.query.getParam("search"));

  const handleInputChange = (value: string) => {
    const params = new URLSearchParams(location.search);

    params.set("search", value);

    setInputValue(value);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleButtonClick = () => {
    inputValue ? store.setOrg(inputValue) : store.setOrg("ktsstudio");
    rootStore.query.setSearch(inputValue);
    store.fetch();
  };

  const handleSelect = (selectedOptions: Option[]) => {
    const selectedType = selectedOptions.at(-1)?.key;
    if (selectedType) {
      store.setRepoType(selectedType);

      const params = new URLSearchParams(location.search);
      params.set("filter", selectedType);
      navigate(`${location.pathname}?${params.toString()}`);

      rootStore.query.setSearch(params.toString());

      store.fetch();
    }
  };
  const getTitle = useCallback((values: Option[]) => {
    return values.length === 0 ? "Type" : values.map(({ value }) => value).join(", ");
  }, []);

  return (
    <div className={styles.root}>
      <MultiDropdown
        className={styles.root__dropdown}
        options={[
          { key: "all", value: "all" },
          { key: "public", value: "public" },
          { key: "private", value: "private" },
          { key: "forks", value: "forks" },
          { key: "sources", value: "sources" },
          { key: "member", value: "member" },
        ]}
        value={store.repoType ? [{ key: store.repoType, value: store.repoType }] : []}
        onChange={handleSelect}
        getTitle={getTitle}
      />
      <div className={styles.root__search}>
        <Input
          className={styles.root__search__input}
          value={rootStore.query.getParam("search")}
          onChange={handleInputChange}
          placeholder="Enter organization name"
        ></Input>
        <Button onClick={handleButtonClick}>
          <img src={searchLogo} alt="Search Icon" width="24px" height="24px" />
        </Button>
      </div>
    </div>
  );
});
