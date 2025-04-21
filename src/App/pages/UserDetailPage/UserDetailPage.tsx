import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router";
import { useUserPageStore } from "./context";
import { UserProvider } from "./provider";
import styles from "./UserDetailPage.module.scss";
import { Meta } from "utils/meta";
import { Loader } from "components/Loader";
import { UserLogo } from "components/UserLogo";
import { Text } from "components/Text";
import { routesConfig } from "config/routes";
import { Button } from "components/Button";
import cn from "classnames"

const UserDetailPageContent: React.FC = observer(() => {
  const store = useUserPageStore();
  const user = store.user;

  if (!user) {
    return <div>юзер не найден</div>;
  }

  return (
    <div className={cn("container", styles.user)}>
      {store.userMeta === Meta.loading && <Loader />}
      <UserLogo src={user.avatarUrl} width="250px" height="250px" alt="User Avatar" />
      <div className={styles.user__name}>
      <Text className="noMarginText" view="p-20" weight="medium">{user.name}</Text>
      <Text className="noMarginText" color="secondary">{user.login}</Text>
      </div>
      <Text>{user.bio}</Text>
      <Link className="link" to={routesConfig.userRepos.create(user.login)}><Button>Repositories</Button></Link>
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
