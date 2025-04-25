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
import { rootStore } from "store/RootStore";

const UserDetailPageContent: React.FC = observer(() => {
  let store = useUserPageStore();
  let isCurrent = store.isCurrent;

  if (store.isCurrent) {
    store = rootStore.auth;
  }

  const user = store.user;

  if (store.userMeta === Meta.loading) {
    return <Loader />;
  }

  if (store.userMeta === Meta.error || !user) {
    return <div>User not found</div>;
  }

  return (
    <div className={cn("container", styles.user)}>
      <div>
        <UserLogo src={user.avatarUrl} width="250px" height="250px" alt="User Avatar" />
        <div className={styles.user__name}>
          <Text className="noMarginText" view="p-20" weight="medium">
            {user.name}
          </Text>
          <Text className="noMarginText" color="secondary">
            {user.login}
          </Text>
        </div>
        <Text>{user.bio}</Text>
      </div>
      <div className={styles.user__repos}>
        <div className={styles.user__repos__menu}>
          <Link className={cn("link", styles.user__repos)} to={routesConfig.userRepos.create(user.login)}>
            <Button>Repositories</Button>
          </Link>

          {isCurrent && (
            <Link className="link" to={routesConfig.createRepo.create()}>
              <Button>Add repo</Button>
            </Link>
          )}
        </div>
        <UserReposSection store={store} />
      </div>
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
