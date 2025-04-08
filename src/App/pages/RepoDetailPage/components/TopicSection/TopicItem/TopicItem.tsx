import { Text } from "components/Text";
import styles from "./topicItem.module.scss";

interface TopicItemProps {
  topicName: string;
}

export const TopicItem: React.FC<TopicItemProps> = ({ topicName }) => {
  return (
    <div className={styles.topic}>
      <Text className={styles.topic__name} weight="bold" view="p-12">
        {topicName}
      </Text>
    </div>
  );
};

