import cn from "classnames";
import React from "react";

import { routesConfig } from "config/routes";
import { observer } from "mobx-react-lite";
import { Link } from "react-router";
import { RepoModel } from "store/models";
import { MiniCard } from "./MiniCard";
import styles from "./MiniReposSection.module.scss";

export const MiniReposSection: React.FC = observer(
  ({ repos, className }: { repos: RepoModel[]; className: string }) => {
    return (
      <div className={cn(styles.root)}>
        <div className={cn(styles.root__repos, className)}>
          {repos.map((repo) => (
            <Link
              key={repo.id}
              className={cn("link", styles.root__repos__item)}
              to={routesConfig.repoDetail.create(repo.owner.login, repo.name)}
            >
              <MiniCard className={styles.root__repos__ite} repo={repo}></MiniCard>
            </Link>
          ))}
        </div>
      </div>
    );
  },
);
