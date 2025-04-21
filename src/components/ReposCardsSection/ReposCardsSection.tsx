import { Card } from "components/Card";

import { routesConfig } from "config/routes";
import { observer } from "mobx-react-lite";
import { Link } from "react-router";
import { RepoModel } from "store/models";
import styles from "./ReposCardsSection.module.scss";

export const ReposCardsSection = observer(({ repos }: { repos: RepoModel[] }) => {
  return (
    <div className={styles.root}>
      {repos.map((repo) => (
        <Link
          key={repo.id}
          className={styles.root__link}
          to={routesConfig.repoDetail.create(repo.owner.login, repo.name)}
        >
          <Card className={styles.root__card} image={repo.owner.avatarUrl} title={repo.name} subtitle={repo.description}></Card>
        </Link>
      ))}
    </div>
  );
});
