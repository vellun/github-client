import { Text } from "components/Text";
import styles from "./StatsItem.module.scss";

interface StatsItemProps {
  iconComponent: React.ReactNode;
  statCount: number;
  statName: string;
}

export const StatsItem: React.FC<StatsItemProps> = ({ iconComponent, statCount, statName }) => {
  return (
    <div className={styles.root}>
      {iconComponent}
      <div className={styles.root__text}>
        <Text tag="span" color="secondary" weight="medium" view="p-14">
          {`${statCount} ${statName}`}
        </Text>
      </div>
    </div>
  );
};
