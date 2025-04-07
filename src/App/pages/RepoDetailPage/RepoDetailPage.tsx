import { Loader } from "components/Loader";
import { observer, useLocalObservable } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import { GithubRepoStore } from "store/GithubStore";
import { Meta } from "utils/meta";
import ContributorsSection from "./components/ContributorsSection/ContributorsSection";
import Readme from "./components/Readme";
import RepoLink from "./components/RepoLink";
import StatsSection from "./components/StatsSection/StatsSection";
import TitleSection from "./components/TitleSection";
import TopicSection from "./components/TopicSection/TopicSection";
import styles from "./RepoDetailPage.module.scss";
import rootStore from "store/RootStore";

export const RepoDetailPage: React.FC = observer(() => {
  const { repoName } = useParams<{ repoName: string }>();
  const { orgName } = useParams<{ orgName: string }>();
  const store = useLocalObservable(() => new GithubRepoStore());

  useEffect(() => {
    // const repoName = rootStore.query.getParam("search")
    console.log("AAAAAAAAAAAAAAAAAAAAAaaaa", repoName);
    store.fetch(orgName, repoName);
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
