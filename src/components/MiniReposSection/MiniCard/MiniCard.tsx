import React from "react";

import { Text } from "components/Text";
import { UserLogo } from "components/UserLogo";
import { RepoModel } from "store/models";
import styles from "./MiniCard.module.scss";
import { observer } from "mobx-react-lite";
import cn from "classnames";

export const MiniCard: React.FC = observer(({ className, repo }: { className: string; repo: RepoModel }) => {
  return (
    <div className={cn(className, styles.card)}>
      <div className={styles.card__title}>
        <UserLogo src={repo.owner.avatarUrl} alt="Repo Owner Avatar"></UserLogo>
        <Text weight="medium">{repo.name}</Text>
      </div>
      <Text className={styles.text} view="p-14">
        {repo.description}
      </Text>
    </div>
  );
});
