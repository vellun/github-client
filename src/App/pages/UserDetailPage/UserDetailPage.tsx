import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useUserPageStore } from "./context";
import { UserProvider } from "./provider";
import styles from "./UserDetailPage.module.scss";
import { Meta } from "utils/meta";
import { Loader } from "components/Loader";
import { UserLogo } from "components/UserLogo";
import { Text } from "components/Text";

const UserDetailPageContent: React.FC = observer(() => {
  const store = useUserPageStore();
  const user = store.user;

  if (!user) {
    return <div>юзер не найден</div>;
  }

  return (
    <div className={styles.root}>
      {store.userMeta === Meta.loading && <Loader />}
      <UserLogo src={user.avatarUrl} width="250px" height="250px" alt="User Avatar" />
      <Text view="p-20" weight="medium">{user.name}</Text>
      <Text color="secondary">{user.login}</Text>
      <Text>{user.bio}</Text>
      {user.type}
    </div>
  );
});

export const UserDetailPage = () => {
  const { login } = useParams<{ login: string }>();
  return (
    <UserProvider login={login}>
      <UserDetailPageContent />
    </UserProvider>
  );
};
