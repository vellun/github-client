import RepsService from "api/RepsService";
import { useFetching } from "hooks/useFetching";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import TitleSection from "./components/TitleSection";
import styles from "./RepoDetailPage.module.scss";
import Readme from "./components/Readme";

const RepoDetailPage = () => {
  const { repoName } = useParams();
  const [repo, setRepo] = useState(null);
  const [fetchRepo, error] = useFetching(async () => {
    const repo = await RepsService.getByRepoName(repoName);
    setRepo(repo);
  });

  useEffect(() => {
    fetchRepo();
  }, [repoName]);

  return (
    <div className={styles.RepoDetailPage}>
      <div className={styles.Page}>
        <TitleSection repo={repo} />
        <Readme repo={repo} />
      </div>
    </div>
  );
};

export default RepoDetailPage;
