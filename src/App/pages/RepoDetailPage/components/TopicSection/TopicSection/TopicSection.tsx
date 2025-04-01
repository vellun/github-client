import TopicItem from "../TopicItem";
import styles from "./topicSection.module.scss";

const TopicSection = ({ topics }) => {
  return (
    <div className={styles.TopicSection}>
      {topics.map((topic, index) => (
        <TopicItem key={index} topicName={topic} />
      ))}
    </div>
  );
};

export default TopicSection;
