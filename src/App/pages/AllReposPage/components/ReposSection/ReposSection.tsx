import Card from "components/Card";

import ktsCat from "assets/images/kts-cat.png";
import { Loader } from "components/Loader";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link } from "react-router";
import { GithubAllReposStore } from "store/GithubStore";
import { Meta } from "utils/meta";
import styles from "./ReposSection.module.scss";

export const ReposSection = observer(({ store }: { store: GithubAllReposStore }) => {
  useEffect(() => {
    store.fetch();
  }, [store]);

  return (
    <div className={styles.RepsSection}>
      {store.meta === Meta.loading && <Loader />}
      {store.repos.map((repo) => (
        <Link key={repo.id} className={styles.cardLink} to={`/repositories/${repo.owner.login}/${repo.name}`}>
          <Card className={styles.RepoCard} image={ktsCat} title={repo.name} subtitle={repo.description}></Card>
        </Link>
      ))}
    </div>
  );
});
