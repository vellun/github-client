import cn from "classnames";
import { SidePanel } from "components/SidePanel";
import { Text } from "components/Text";
import { UserLogo } from "components/UserLogo";
import { rootStore } from "store/RootStore";
import styles from "./Sidebar.module.scss";

export type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
};

const SidebarTitleSlot = () => {
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
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }: SidebarProps) => {
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className={cn(styles.overlay, { [styles.overlay__open]: !isOpen })} onClick={closeSidebar} />
      <SidePanel
        className={cn(styles.sidebar, { [styles["sidebar-open"]]: isOpen })}
        titleSlot={<SidebarTitleSlot />}
        close={closeSidebar}
      />
    </div>
  );
};
