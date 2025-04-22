import cn from "classnames";
import { Text } from "components/Text";
import { UserLogo } from "components/UserLogo";
import { Link } from "react-router";
import styles from "./SidePanel.module.scss";

export const SidePanel = ({ className }) => {
    return (
        <div className={cn(className, styles.panel)}>
            <div className={styles.panel__title}> <UserLogo /> <Text>Link in</Text></div>
            <ul className={styles.panel__menu}>
                <li><Link className={styles.panel__link} to="#"><Text>Profile</Text></Link></li>
                <li><Link className={styles.panel__link} to="#"><Text>Repositories</Text></Link></li>
                <li><Link className={styles.panel__link} to="#"><Text>Log out</Text></Link></li>
            </ul>
        </div>
    );
};