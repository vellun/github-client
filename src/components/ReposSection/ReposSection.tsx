import { Card } from "components/Card";
import { Loader } from "components/Loader";
import { observer } from "mobx-react-lite";
import { AllReposStore } from "store/AllReposStore";
import { Meta } from "utils/meta";

import { StarIcon } from "components/icons/StarIcon";
import { Text } from "components/Text";
import { routesConfig } from "config/routes";
import { Link } from "react-router";
import { formatDate } from "utils/formatDate";
import styles from "./ReposSection.module.scss";

export const ReposSection = observer(({ store }: { store: AllReposStore }) => {
  if (store.meta === Meta.loading) {
    return <Loader />;
  }

  if (store.meta === Meta.error) {
    return <div>Repositories not found</div>;
  }

  return (
    <div className={styles.root}>
      {store.repos.map((repo) => (
        <Link
          key={repo.id}
          className={styles.root__link}
          to={routesConfig.repoDetail.create(repo.owner.login, repo.name)}
        >
          <Card
            className={styles.root__card}
            image={repo.owner.avatarUrl}
            title={repo.name}
            subtitle={repo.description}
            captionSlot={
              <div className={styles.root__card__caption}>
                <div className={styles.root__card__stars}>
                  <StarIcon width={14} height={14} />
                  <Text className={"noMarginText"} view="p-14">
                    {repo.stargazersCount}
                  </Text>
                </div>
                <Text className={"noMarginText"}>{formatDate(repo.pushedAt)}</Text>
              </div>
            }
          ></Card>
        </Link>
      ))}
    </div>
  );
});
