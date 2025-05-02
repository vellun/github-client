import { Loader } from "components/Loader";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { Meta } from "utils/meta";
import { addViewedRepo } from "utils/viewedRepos";
import { ContributorsSection } from "./components/ContributorsSection/ContributorsSection";
import { LanguagesSection } from "./components/LanguagesSection";
import { Readme } from "./components/Readme";
import { RepoLink } from "./components/RepoLink";
import { StatsSection } from "./components/StatsSection/StatsSection";
import { TitleSection } from "./components/TitleSection";
import { TopicSection } from "./components/TopicSection/TopicSection";
import { useRepoPageStore } from "./context";
import { RepoProvider } from "./provider";
import styles from "./RepoDetailPage.module.scss";
import { useEffect } from "react";
import { useBackground } from "components/Layout/context";

const RepoDetailPageContent: React.FC = observer(() => {
  const store = useRepoPageStore();
  const repo = store?.repo;
  const { setBackgroundColor } = useBackground();

  useEffect(() => {
    setBackgroundColor("accent");
    return () => setBackgroundColor("normal")
  }, [setBackgroundColor]);

  if (!repo) {
    return <div>Репозиторий не найден</div>;
  }

  addViewedRepo(repo);

  return (
    <div className={styles.root}>
      {store.repoMeta === Meta.loading && <Loader />}
      {store.repoMeta === Meta.error && <div>Репозиторий не найден</div>}
      <div className={styles.root__page}>
        <TitleSection login={repo.owner.login} avatarUrl={repo.owner.avatarUrl} repoName={repo.name} />
        {repo.homepage && <RepoLink repo={repo} />}
        {repo.topics && <TopicSection topics={repo.topics} />}

        <StatsSection
          starsCount={repo.stargazersCount}
          watchingCount={repo.watchersCount}
          forksCount={repo.forksCount}
        />

        <div className={styles.root__info}>
          {store?.contributors?.length !== 0 && <ContributorsSection store={store} />}
          <LanguagesSection store={store} />
        </div>

        {store.readmeMeta === Meta.success && <Readme store={store} />}
      </div>
    </div>
  );
});

export const RepoDetailPage = () => {
  const { orgName, repoName } = useParams<{ orgName: string; repoName: string }>();
  return (
    <RepoProvider orgName={orgName} repoName={repoName}>
      <RepoDetailPageContent />
    </RepoProvider>
  );
};
