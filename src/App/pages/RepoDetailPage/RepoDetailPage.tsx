import { Loader } from "components/Loader";
import { observer, useLocalObservable } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import { RepoStore } from "store/ReposStore";
import { Meta } from "utils/meta";
import { ContributorsSection } from "./components/ContributorsSection/ContributorsSection";
import { Readme } from "./components/Readme";
import { RepoLink } from "./components/RepoLink";
import { StatsSection } from "./components/StatsSection/StatsSection";
import { TitleSection } from "./components/TitleSection";
import { TopicSection } from "./components/TopicSection/TopicSection";
import styles from "./RepoDetailPage.module.scss";

export const RepoDetailPage: React.FC = observer(() => {
  const { repoName } = useParams<{ repoName: string }>();
  const { orgName } = useParams<{ orgName: string }>();
  const store = useLocalObservable(() => new RepoStore());

  useEffect(() => {
    store.fetchRepo(orgName, repoName);
  }, [store, repoName, orgName]);

  const repo = store.repo;

  return (
    <div className={styles.root}>
      {store.repoMeta === Meta.loading && <Loader />}
      <div className={styles.root__page}>
        {repo && <TitleSection avatarUrl={repo.owner.avatarUrl} repoName={repo.name} />}
        {repo && repo.homepage && <RepoLink repo={repo} />}
        {repo && repo.topics && <TopicSection topics={repo.topics} />}
        {repo && (
          <StatsSection
            starsCount={repo.stargazersCount}
            watchingCount={repo.watchersCount}
            forksCount={repo.forksCount}
          />
        )}
        {repo && <ContributorsSection store={store} />}
        {repo && <Readme store={store} />}
      </div>
    </div>
  );
});
