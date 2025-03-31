import searchLogo from "assets/icons/search.svg";
import Button from "components/Button";
import Input from "components/Input";
import MultiDropdown from "components/MultiDropdown";
import Text from "components/Text";
import styles from "./AllRepsPage.module.scss";

const AllRepsPage = () => {
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
          <Input value="" onChange={(value: string) => value} placeholder="Enter organization name"></Input>
          <Button>
            <img src={searchLogo} alt="Search Icon" width="24px" height="24px" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllRepsPage;
