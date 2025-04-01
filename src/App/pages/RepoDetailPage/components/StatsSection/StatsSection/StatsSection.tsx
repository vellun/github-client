import StatsItem from "../StatsItem";
import styles from "./StatsSection.module.scss";

import starsIcon from "assets/icons/star-icon.svg";
import watchingIcon from "assets/icons/eye-icon.svg";
import forksIcon from "assets/icons/forks-icon.svg";

const StatsSection = ({ starsCount, watchingCount, forksCount }) => {
  return (
    <div className={styles.StatsSection}>
      <StatsItem iconPath={starsIcon} statCount={starsCount} statName={"stars"} />
      <StatsItem iconPath={watchingIcon} statCount={watchingCount} statName={"watching"} />
      <StatsItem iconPath={forksIcon} statCount={forksCount} statName={"forks"} />
    </div>
  );
};

export default StatsSection;
