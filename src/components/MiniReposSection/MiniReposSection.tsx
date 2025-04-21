import cn from "classnames";
import { Text } from "components/Text";
import React from "react";

import { MiniCard } from "components/MiniReposSection/MiniCard";
import { routesConfig } from "config/routes";
import { Link } from "react-router";
import { RepoModel } from "store/models";
import styles from "./MiniReposSection.module.scss";

export const MiniReposSection: React.FC = ({ repos }: { repos: RepoModel[] }) => {
    return (
        <div className={styles.root}>
            <Text weight="medium" view="p-20" maxLines={2}>Last seen repositories</Text>
            <div className={styles.root__repos}>
                {repos.map((repo) => (
                    <Link
                        key={repo.id}
                        className={cn("link", styles.root__repos__item)}
                        to={routesConfig.repoDetail.create(repo.owner.login, repo.name)}
                    >
                        <MiniCard repo={repo}></MiniCard>
                    </Link>
                ))}
            </div>
        </div>
    );
};
