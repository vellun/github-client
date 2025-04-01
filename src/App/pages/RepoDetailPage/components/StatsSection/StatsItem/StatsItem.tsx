import Text from "components/Text";
import styles from "./StatsItem.module.scss";

const StatsItem = ({ iconPath, statCount, statName }) => {
  return (
    <div className={styles.StatsItem}>
      <img src={iconPath} alt="Stat Item Icon" width="16px" height="16px" />
      <div className={styles.StatsItemText}>
        <Text tag="span" className={styles.StatsItem} color="secondary" weight="medium" view="p-14">
          {`${statCount} ${statName}`}
        </Text>
      </div>
    </div>
  );
};

export default StatsItem;
