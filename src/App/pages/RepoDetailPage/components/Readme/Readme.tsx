import { Text } from "components/Text";
import { observer } from "mobx-react-lite";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { RepoStore } from "store/RepoStore";
import styles from "./Readme.module.scss";

export const Readme: React.FC<{ store: RepoStore }> = observer(({ store }) => {
  return (
    <div className={styles.root}>
      <Text className={styles.root__title} view="p-12" weight="bold" color="primary">
        README.md
      </Text>
      <div className={styles.root__content}>
        <ReactMarkdown children={store.readme} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]} />
      </div>
    </div>
  );
});
