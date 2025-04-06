import searchLogo from "assets/icons/search.svg";
import Button from "components/Button";
import { Input } from "components/Input";
import MultiDropdown from "components/MultiDropdown";
import Text from "components/Text";
import { observer } from "mobx-react-lite";
import styles from "./AllReposPage.module.scss";
import { ReposSection } from "./components/ReposSection";

export const AllReposPage: React.FC = observer(() => {
  return (
    <div className={styles.allRepsPage}>
      <Text tag="h1" weight="bold" color="primary" view="title">
        List of organization repositories
      </Text>
      <div className={styles.filtersSection}>
        <MultiDropdown
          options={[
            { key: "msk", value: "Москва" },
            { key: "spb", value: "Санкт-Петербург" },
            { key: "ekb", value: "Екатеринбург" },
          ]}
          value={[{ key: "msk", value: "Москва" }]}
          onChange={() => ""}
          getTitle={() => ""}
        />
        <div className={styles.searchSection}>
          <Input
            value=""
            onChange={(value: string) => console.log(value)}
            placeholder="Enter organization name"
          ></Input>
          <Button>
            <img src={searchLogo} alt="Search Icon" width="24px" height="24px" />
          </Button>
        </div>
      </div>
      <ReposSection />
    </div>
  );
});
