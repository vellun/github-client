import { Card } from "components/Card";

import { StarIcon } from "components/icons/StarIcon";
import { Text } from "components/Text";
import { routesConfig } from "config/routes";
import { observer } from "mobx-react-lite";
import { Link } from "react-router";
import { RepoModel } from "store/models";
import styles from "./ReposCardsSection.module.scss";
import { formatDate } from "utils/formatDate";

export const ReposCardsSection = observer(({ repos }: { repos: RepoModel[] }) => {
  return (
    <div className={styles.root}>
      {repos.map((repo) => (
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
