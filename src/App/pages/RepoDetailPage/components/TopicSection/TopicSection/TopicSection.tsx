import { TopicItem } from "../TopicItem";
import styles from "./topicSection.module.scss";

interface TopicSectionProps {
  topics: string[];
}

export const TopicSection: React.FC<TopicSectionProps> = ({ topics }) => {
  return (
    <div className={styles.root}>
      {topics.map((topic, index) => (
        <TopicItem key={index} topicName={topic} />
      ))}
    </div>
  );
};
