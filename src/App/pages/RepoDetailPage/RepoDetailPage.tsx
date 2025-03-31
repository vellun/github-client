import Readme from "./components/Readme";
import styles from "./RepoDetailPage.module.scss";
import TitleSection from "./components/TitleSection";

const RepoDetailPage = ({ repo }) => {
  return (
    <div className={styles.RepoDetailPage}>
      <TitleSection></TitleSection>
      {/* <Readme orgName={repo.owner.login} repoName={repo.name} /> */}
      <Readme orgName="ktsstudio" repoName="notific" />
    </div>
  );
};

export default RepoDetailPage;
