import TopicItem from "../TopicItem";
import styles from "./topicSection.module.scss";

interface TopicSectionProps {
  topics: string[];
}

const TopicSection: React.FC<TopicSectionProps> = ({ topics }) => {
  return (
    <div className={styles.TopicSection}>
      {topics.map((topic, index) => (
        <TopicItem key={index} topicName={topic} />
      ))}
    </div>
  );
};

export default TopicSection;
