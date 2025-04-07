import { Loader } from "components/Loader";
import { Text } from "components/Text";
import { observer, useLocalObservable } from "mobx-react-lite";
import { GithubAllReposStore } from "store/GithubStore";
import { Meta } from "utils/meta";
import styles from "./AllReposPage.module.scss";
import { FiltersSection } from "./components/FiltersSection";
import { ReposSection } from "./components/ReposSection";
import { useLocation, useNavigate } from "react-router";

export const AllReposPage: React.FC = observer(() => {
  const repoStore = useLocalObservable(() => new GithubAllReposStore());

  const location = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    repoStore.setPage(newPage);

    const params = new URLSearchParams(location.search);
    params.set("page", newPage.toString());

    navigate(`${location.pathname}?${params.toString()}`);
    repoStore.fetch();
  };

  return (
    <div className={styles.allRepsPage}>
      <Text tag="h1" weight="bold" color="primary" view="title">
        List of organization repositories
      </Text>
      {<FiltersSection store={repoStore} />}

      <ReposSection store={repoStore} />
      {repoStore.meta === Meta.loading && <Loader />}

      <div className={styles.pagination}>
        <button onClick={() => handlePageChange(repoStore.currentPage - 1)} disabled={repoStore.currentPage === 1}>
          Previous
        </button>
        <button onClick={() => handlePageChange(repoStore.currentPage + 1)}>Next</button>
      </div>
    </div>
  );
});
