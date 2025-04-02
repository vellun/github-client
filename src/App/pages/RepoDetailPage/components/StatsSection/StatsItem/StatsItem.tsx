import Text from "components/Text";
import styles from "./StatsItem.module.scss";

interface StatsItemProps {
  iconComponent: React.ReactNode;
  statCount: number;
  statName: string;
}

const StatsItem: React.FC<StatsItemProps> = ({ iconComponent, statCount, statName }) => {
  return (
    <div className={styles.StatsItem}>
      {iconComponent}
      <div className={styles.StatsItemText}>
        <Text tag="span" className={styles.StatsItem} color="secondary" weight="medium" view="p-14">
          {`${statCount} ${statName}`}
        </Text>
      </div>
    </div>
  );
};

export default StatsItem;
