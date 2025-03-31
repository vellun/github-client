import React from "react";

import styles from "./RepoDetailPage.module.scss";
import TitleSection from "./components/TitleSection";

const RepoDetailPage = ({ repo }) => {
  return (
    <div className={styles.RepoDetailPage}>
      <TitleSection></TitleSection>
    </div>
  );
};

export default RepoDetailPage;
