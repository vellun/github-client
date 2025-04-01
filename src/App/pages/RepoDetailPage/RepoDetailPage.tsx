import RepsService from "api/RepsService";
import { useFetching } from "hooks/useFetching";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import TitleSection from "./components/TitleSection";
import styles from "./RepoDetailPage.module.scss";
import Readme from "./components/Readme";
import RepoLink from "./components/RepoLink";
import TopicSection from "./components/TopicSection/TopicSection";
import StatsSection from "./components/StatsSection/StatsSection";

const RepoDetailPage = () => {
  const { repoName } = useParams();
  const [repo, setRepo] = useState(null);
  const [fetchRepo, error] = useFetching(async () => {
    const repo = await RepsService.getByRepoName(repoName);
    setRepo(repo);
    console.log(repo.stargazers_count)
  });

  useEffect(() => {
    fetchRepo();
  }, [repoName]);

  return (
    <div className={styles.RepoDetailPage}>
      <div className={styles.Page}>
        <TitleSection repo={repo} />
        {repo && repo.homepage && <RepoLink repo={repo} />}
        {repo && repo.topics && <TopicSection topics={repo.topics} />}
        {repo && (
          <StatsSection
            starsCount={repo.stargazers_count}
            watchingCount={repo.watchers_count}
            forksCount={repo.forks_count}
          />
        )}
        <Readme repo={repo} />
      </div>
    </div>
  );
};

export default RepoDetailPage;
