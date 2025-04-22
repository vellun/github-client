import cn from "classnames";
import { Button } from "components/Button";
import { Loader } from "components/Loader";
import { UserReposSection } from "./components/UserReposSection";
import { Text } from "components/Text";
import { UserLogo } from "components/UserLogo";
import { routesConfig } from "config/routes";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router";
import { Meta } from "utils/meta";
import { useUserPageStore } from "./context";
import { UserProvider } from "./provider";
import styles from "./UserDetailPage.module.scss";

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
      <UserReposSection store={store} />
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
