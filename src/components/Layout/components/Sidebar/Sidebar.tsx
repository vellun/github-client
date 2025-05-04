import AuthService from "api/AuthService";
import cn from "classnames";
import { SidePanel } from "components/SidePanel";
import { Text } from "components/Text";
import { UserLogo } from "components/UserLogo";
import { routesConfig } from "config/routes";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { rootStore } from "store/RootStore";
import styles from "./Sidebar.module.scss";

export type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
};

const SidebarTitleSlot = observer(() => {
  const curUser = rootStore.auth.user?.login;

  return (
    <div className={styles.sidebar__title__name}>
      <UserLogo src={rootStore.auth.user?.avatarUrl} alt="Current User Avatar" />
      <div>
        <Text weight="medium" className="noMarginText">
          {rootStore.auth.user?.name}
        </Text>
        <Text color="secondary" className="noMarginText">
          {curUser}
        </Text>
      </div>
    </div>
  );
});

export const Sidebar: React.FC<SidebarProps> = observer(({ isOpen, setIsOpen }: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate(routesConfig.login.create());
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  let curUser = "";
  if (rootStore.auth.user !== undefined && rootStore.auth.user !== null) {
    curUser = rootStore.auth.user.login;
  }

  const sidebarLinks = [
    { title: "Profile", href: routesConfig.userDetail.create(curUser), onClick: closeSidebar },
    { title: "Repositories", href: routesConfig.userRepos.create(curUser), onClick: closeSidebar },
    {
      title: "Log out",
      href: "#",
      onClick: () => {
        handleLogout();
        closeSidebar();
      },
    },
  ];

  return (
    <div>
      <div className={cn(styles.overlay, { [styles.overlay__open]: !isOpen })} onClick={closeSidebar} />
      <SidePanel
        className={cn(styles.sidebar, { [styles["sidebar-open"]]: isOpen })}
        titleSlot={<SidebarTitleSlot />}
        close={closeSidebar}
        links={sidebarLinks}
      />
    </div>
  );
});
