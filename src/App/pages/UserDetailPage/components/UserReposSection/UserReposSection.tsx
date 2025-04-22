import { Loader } from "components/Loader";
import { MiniReposSection } from "components/MiniReposSection";
import { observer } from "mobx-react-lite";
import { UserStore } from "store/UserStore";
import { Meta } from "utils/meta";
import styles from "./ReposSection.module.scss";

export const UserReposSection: React.FC<{ store: UserStore }> = observer(({ store }) => {
    const reposNum = store.repos?.length
    const repos = store.repos?.slice(0, 6)
  
    return (
      <div className={styles.repos}>
        {store.reposMeta === Meta.loading && <Loader />}
        <MiniReposSection repos={repos} />
      </div>
    );
  });