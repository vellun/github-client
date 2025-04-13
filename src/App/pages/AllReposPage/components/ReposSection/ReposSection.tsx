import { Card } from "components/Card";

import ktsCat from "assets/images/kts-cat.png";
import { Loader } from "components/Loader";
import { routesConfig } from "config/routes";
import { observer } from "mobx-react-lite";
import { Link } from "react-router";
import { AllReposStore } from "store/AllReposStore";
import { Meta } from "utils/meta";
import styles from "./ReposSection.module.scss";

export const ReposSection = observer(({ store }: { store: AllReposStore }) => {
  return (
    <div className={styles.root}>
      {store.meta === Meta.loading && <Loader />}
      {store.repos.map((repo) => (
        <Link
          key={repo.id}
          className={styles.root__link}
          to={routesConfig.repoDetail.create(repo.owner.login, repo.name)}
        >
          <Card className={styles.root__card} image={ktsCat} title={repo.name} subtitle={repo.description}></Card>
        </Link>
      ))}
    </div>
  );
});
