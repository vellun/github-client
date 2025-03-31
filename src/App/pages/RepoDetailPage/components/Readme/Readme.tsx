import { useEffect, useState } from "react";
import styles from "./Readme.module.scss";
import { useFetching } from "hooks/useFetching";
import RepsService from "api/RepsService";
import Text from "components/Text";

const Readme = ({ orgName, repoName }) => {
  const [readmeHtml, setReadmeHtml] = useState<string>("");

  const [fetchReadme, error] = useFetching(async () => {
    const reps = await RepsService.getReadme(orgName, repoName);
    setReadmeHtml(reps);
  });

  useEffect(() => {
    fetchReadme();
  }, []);
  return (
    <div className={styles.Readme}>
      <Text className={styles.readmeText} view="p-12" weight="bold" color="primary">
        README.md
      </Text>
      <div className={styles.ReadmeContent} dangerouslySetInnerHTML={{ __html: readmeHtml }} />
    </div>
  );
};

export default Readme;
