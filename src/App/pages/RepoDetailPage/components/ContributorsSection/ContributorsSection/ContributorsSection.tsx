import UsersService, { Contributor, User } from "api/UsersService";
import Text from "components/Text";
import { useFetching } from "hooks/useFetching";
import { useEffect, useState } from "react";
import styles from "./ContributorsSection.module.scss";
import ContributorsItem from "../ContributorsItem";

interface ContributorsProps {
  repoName: string;
}

const ContributorsSection: React.FC<ContributorsProps> = ({ repoName }) => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const [login, setLogin] = useState<string>("");

  const [fetchContributors, _] = useFetching(async (): Promise<void> => {
    const contributors = await UsersService.getContributors(repoName);
    setContributors(contributors);
  });

  // const [fetchUser, _] = useFetching(async (): Promise<void> => {
  //   const user = await UsersService.getByLogin(login);
  //   setUser(user);
  // });

  useEffect(() => {
    fetchContributors();
  }, []);

  return (
    <div className={styles.Contributors}>
      <div className={styles.title}>
        <Text className={styles.text} view="p-18" weight="bold" color="primary">
          Contributors
        </Text>
        <div className={styles.ContributorsCount}>
          <Text className={styles.countText} tag="span" weight="bold">
            {contributors.length}
          </Text>
        </div>
      </div>
      {contributors.map((contributor, index) => {
        return <ContributorsItem key={index} login={contributor.login} avatarUrl={contributor.avatar_url} />;
      })}
    </div>
  );
};

export default ContributorsSection;
