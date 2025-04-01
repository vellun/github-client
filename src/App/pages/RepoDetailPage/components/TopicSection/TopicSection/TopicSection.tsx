import TopicItem from "../TopicItem";
import styles from "./topicSection.module.scss";

const TopicSection = ({ topics }) => {
  return (
    <div className={styles.TopicSection}>
      {topics.map((topic) => (
        <TopicItem topicName={topic} />
      ))}
    </div>
  );
};

export default TopicSection;
