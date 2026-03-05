import { UserItem } from "App/pages/AllUsersPage/components/UserItem";

import { Loader } from "components/Loader";
import { routesConfig } from "config/routes";
import { observer } from "mobx-react-lite";
import { Link } from "react-router";
import { AllUsersStore } from "store/AllUsersStore";
import { Meta } from "utils/meta";
import styles from "./UsersSection.module.scss";

export const UsersSection = observer(({ store }: { store: AllUsersStore }) => {
  return (
    <div className={styles.root}>
      {store.meta === Meta.loading && <Loader />}
      {store.users.map((user) => (
        <Link
          key={user.id}
          className="link"
          to={routesConfig.userDetail.create(user.login)}
        >
          <UserItem login={user.login} avatarUrl={user.avatarUrl} type={user.type}></UserItem>
        </Link>
      ))}
    </div>
  );
});
