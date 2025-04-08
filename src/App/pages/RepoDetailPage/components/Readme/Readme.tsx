import { useEffect, useState } from "react";
import styles from "./Readme.module.scss";
import { useFetching } from "hooks/useFetching";
import RepsService from "api/RepsService";
import { Text } from "components/Text";
import { observer } from "mobx-react-lite";

interface ReadmeProps {
  repoName: string;
}

export const Readme: React.FC<ReadmeProps> = observer(({ repoName }) => {
  const [readmeHtml, setReadmeHtml] = useState<string>("");

  const [fetchReadme, _] = useFetching(async (): Promise<void> => {
    const readme = await RepsService.getReadme(repoName);
    setReadmeHtml(readme);
  });

  useEffect(() => {
    fetchReadme();
  }, [fetchReadme]);
  return (
    <div className={styles.root}>
      <Text className={styles.root__title} view="p-12" weight="bold" color="primary">
        README.md
      </Text>
      <div className={styles.root__content} dangerouslySetInnerHTML={{ __html: readmeHtml }} />
    </div>
  );
});
