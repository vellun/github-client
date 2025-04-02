import { default as Repo, default as RepsService } from "api/RepsService";
import { useFetching } from "hooks/useFetching";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Readme from "./components/Readme";
import RepoLink from "./components/RepoLink";
import StatsSection from "./components/StatsSection/StatsSection";
import TitleSection from "./components/TitleSection";
import TopicSection from "./components/TopicSection/TopicSection";
import styles from "./RepoDetailPage.module.scss";

const RepoDetailPage: React.FC = () => {
  const { repoName } = useParams<{ repoName: string }>();
  const [repo, setRepo] = useState<Repo | null>(null);

  const [fetchRepo, _] = useFetching(async () => {
    if (!repoName) return;
    const repo = await RepsService.getByRepoName(repoName);
    setRepo(repo);
  });

  useEffect(() => {
    fetchRepo();
  }, [repoName]);

  return (
    <div className={styles.RepoDetailPage}>
      <div className={styles.Page}>
        {repo && <TitleSection avatarUrl={repo.owner.avatar_url} repoName={repo.name} />}
        {repo && repo.homepage && <RepoLink repo={repo} />}
        {repo && repo.topics && <TopicSection topics={repo.topics} />}
        {repo && (
          <StatsSection
            starsCount={repo.stargazers_count}
            watchingCount={repo.watchers_count}
            forksCount={repo.forks_count}
          />
        )}
        {repo && <Readme repoName={repo.name} />}
      </div>
    </div>
  );
};

export default RepoDetailPage;
