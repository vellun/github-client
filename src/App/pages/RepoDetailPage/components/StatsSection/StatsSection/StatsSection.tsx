import { StatsItem } from "../StatsItem";
import styles from "./StatsSection.module.scss";

import { EyeIcon } from "components/icons/EyeIcon";
import { ForkIcon } from "components/icons/ForkIcon";
import { StarIcon } from "components/icons/StarIcon";

interface StatsSectionProps {
  starsCount: number;
  watchingCount: number;
  forksCount: number;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ starsCount, watchingCount, forksCount }) => {
  return (
    <div className={styles.root}>
      <StatsItem
        iconComponent={<StarIcon width="16" height="16" color="secondary" />}
        statCount={starsCount}
        statName={"stars"}
      />
      <StatsItem
        iconComponent={<EyeIcon width="16" height="16" color="secondary" />}
        statCount={watchingCount}
        statName={"watching"}
      />
      <StatsItem
        iconComponent={<ForkIcon width="16" height="16" color="secondary" />}
        statCount={forksCount}
        statName={"forks"}
      />
    </div>
  );
};
