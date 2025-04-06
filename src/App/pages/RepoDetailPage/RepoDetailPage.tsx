import { default as Repo, default as RepsService } from "api/RepsService";
import { useFetching } from "hooks/useFetching";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Readme from "./components/Readme";
import RepoLink from "./components/RepoLink";
import StatsSection from "./components/StatsSection/StatsSection";
import TitleSection from "./components/TitleSection";
import TopicSection from "./components/TopicSection/TopicSection";
import ContributorsSection from "./components/ContributorsSection/ContributorsSection";
import styles from "./RepoDetailPage.module.scss";
import { observer, useLocalObservable, useLocalStore } from "mobx-react-lite";
import { GithubRepoStore } from "store/GithubStore";
import { GithubRepoModel } from "store/models/github";
import { Meta } from "utils/meta";
import { Loader } from "components/Loader";

export const RepoDetailPage: React.FC = observer(() => {
  const { repoName } = useParams<{ repoName: string }>();
  const store = useLocalObservable(() => new GithubRepoStore());

  useEffect(() => {
    store.fetch("ktsstudio", repoName);
  }, [store, repoName]);

  const repo = store.repo;

  const ObservedRepolink = observer(RepoLink);

  return (
    <div className={styles.RepoDetailPage}>
      {store.meta === Meta.loading && <Loader />}
      <div className={styles.Page}>
        {repo && <TitleSection avatarUrl={repo.owner.avatarUrl} repoName={repo.name} />}
        {repo && repo.homepage && <ObservedRepolink repo={repo} />}
        {repo && repo.topics && <TopicSection topics={repo.topics} />}
        {repo && (
          <StatsSection
            starsCount={repo.stargazersCount}
            watchingCount={repo.watchersCount}
            forksCount={repo.forksCount}
          />
        )}
        {repo && <ContributorsSection repoName={repo.name} />}
        {repo && <Readme repoName={repo.name} />}
      </div>
    </div>
  );
});
