import { Text } from "components/Text";
import styles from "./topicItem.module.scss";

interface TopicItemProps {
  topicName: string;
}

const TopicItem: React.FC<TopicItemProps> = ({ topicName }) => {
  return (
    <div className={styles.TopicItem}>
      <Text className={styles.TopicName} weight="bold" view="p-12">
        {topicName}
      </Text>
    </div>
  );
};

export default TopicItem;
