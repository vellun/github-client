import searchLogo from "assets/icons/search.svg";
import Button from "components/Button";
import { Input } from "components/Input";
import { Loader } from "components/Loader";
import MultiDropdown from "components/MultiDropdown";
import Text from "components/Text";
import { observer, useLocalObservable } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { GithubAllReposStore } from "store/GithubStore";
import rootStore from "store/RootStore";
import { Meta } from "utils/meta";
import styles from "./AllReposPage.module.scss";
import { ReposSection } from "./components/ReposSection";

export const AllReposPage: React.FC = observer(() => {
  const repoStore = useLocalObservable(() => new GithubAllReposStore());
  const location = useLocation();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState<string>(rootStore.query.getParam("search"));

  const handleInputChange = (value: string) => {
    const newSearch = `search=${value}`;
    setInputValue(value);
    navigate(`${location.pathname}?${newSearch}`);
  };

  const handleButtonClick = () => {
    inputValue ? repoStore.setOrg(inputValue) : repoStore.setOrg("ktsstudio");

    repoStore.fetch();
  };

  useEffect(() => {
    repoStore.fetch();
  }, [repoStore]);

  return (
    <div className={styles.allRepsPage}>
      <Text tag="h1" weight="bold" color="primary" view="title">
        List of organization repositories
      </Text>
      <div className={styles.filtersSection}>
        <MultiDropdown
          options={[
            { key: "public", value: "Public" },
            { key: "private", value: "Private" },
          ]}
          value={[{ key: "msk", value: "Москва" }]}
          onChange={() => ""}
          getTitle={() => ""}
        />
        <div className={styles.searchSection}>
          <Input
            value={rootStore.query.getParam("search")}
            onChange={handleInputChange}
            placeholder="Enter organization name"
          ></Input>
          <Button onClick={handleButtonClick}>
            <img src={searchLogo} alt="Search Icon" width="24px" height="24px" />
          </Button>
        </div>
        <ReposSection store={repoStore} />
        {repoStore.meta === Meta.loading && <Loader />}
      </div>
    </div>
  );
});
