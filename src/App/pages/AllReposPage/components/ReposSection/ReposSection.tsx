import Card from "components/Card";

import ktsCat from "assets/images/kts-cat.png";
import { useLocalStore } from "hooks/useLocal";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link } from "react-router";
import GithubReposStore from "store/GithubStore";
import { Meta } from "utils/meta";
import styles from "./ReposSection.module.scss";

export const ReposSection = observer(() => {
  const store = useLocalStore(() => new GithubReposStore());

  useEffect(() => {
    store.fetch();
  }, [store]);

  if (store.meta === Meta.loading) {
    return <div>Loading...</div>; // Отображаем индикатор загрузки
  }

  if (store.meta === Meta.error) {
    return <div>Error loading repositories</div>; // Обработка ошибки
  }

  console.log(store.meta);

  return (
    <div className={styles.RepsSection}>
      {/* {store.meta === Meta.loading && <RepoCard loading />} */}
      {store.meta === Meta.loading && <div>Loading...</div>}
      {store.repos.map((repo) => (
        <Link key={repo.id} className={styles.cardLink} to={`/repositories/${repo.name}`}>
          <Card className={styles.RepoCard} image={ktsCat} title={repo.name} subtitle={repo.description}></Card>
        </Link>
      ))}
    </div>
  );
});
