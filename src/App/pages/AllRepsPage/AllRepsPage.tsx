import Text from "components/Text";
import Navbar from "components/Navbar";
import React from "react";
import styles from "./AllRepsPage.module.scss";
import MultiDropdown from "components/MultiDropdown";
import { Option } from "components/MultiDropdown";

const AllRepsPage = () => {
  return (
    <div className={styles.allRepsPage}>
      <Text tag="h1" weight="bold" color="primary" view="title">
        List of organization repositories
      </Text>
      <div className="filters">
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
      </div>
    </div>
  );
};

export default AllRepsPage;
