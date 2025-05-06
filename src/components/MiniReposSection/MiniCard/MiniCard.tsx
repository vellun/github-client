import React from "react";

import cn from "classnames";
import { Text } from "components/Text";
import { UserLogo } from "components/UserLogo";
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
      </div>
      <Text className={styles.text} color="primary" view="p-14">
        {repo.description}
      </Text>
    </div>
  );
};
