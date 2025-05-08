import React from "react";

import cn from "classnames";
import { Text } from "components/Text";
import { UserLogo } from "components/UserLogo";
import { colors } from "config/githubColors";
import { RepoModel } from "store/models";
import styles from "./MiniCard.module.scss";

export const MiniCard: React.FC = ({ className, repo }: { className: string; repo: RepoModel }) => {
  return (
    <div className={cn(className, styles.card)}>
      <div className={styles.card__title}>
        <UserLogo src={repo.owner.avatarUrl} alt="Repo Owner Avatar"></UserLogo>
        <Text weight="medium" color="primary">
          {repo.name}
        </Text>
        <div className={styles.private}>
          <Text className={styles.private__name} color="primary" weight="bold" view="p-12">
            {repo.private ? "private" : "public"}
          </Text>
        </div>
      </div>
      <Text className={styles.text} maxLines="2" color="primary" view="p-14">
        {repo.description}
      </Text>
      {repo.language && (
        <div className={styles.lang}>
          <div className={styles.lang__dot} style={{ backgroundColor: colors[repo.language].color }} />
          <Text className="noMarginText" color="primary" view="p-14">
            {repo.language}
          </Text>
        </div>
      )}
    </div>
  );
};
