import Text from "components/Text";
import styles from "./topicItem.module.scss";

const TopicItem = ({ topicName }) => {
  return (
    <div className={styles.TopicItem}>
      <Text className={styles.TopicName} weight="bold" view="p-12">
        {topicName}
      </Text>
    </div>
  );
};

export default TopicItem;
