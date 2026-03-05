import cn from "classnames";
import { Text } from "components/Text";
import { Link } from "react-router";
import styles from "./SidePanel.module.scss";

interface SidePanelLink {
  title: string;
  href: string;
  onClick?: React.MouseEventHandler;
}

interface SidePanelProps {
  className?: string;
  titleSlot?: React.ReactNode;
  links: SidePanelLink[];
  close: () => void;
}

export const SidePanel: React.FC<SidePanelProps> = ({ className, titleSlot, links, close }) => {
  return (
    <div className={cn(className, styles.panel)}>
      <div className={styles.panel__content}>
        <div className={styles.panel__title}>
          {titleSlot}
          <button onClick={close} className={styles.panel__close}>
            +
          </button>
        </div>
        <ul className={styles.panel__menu}>
          {links.map((link, index) => (
            <li key={index}>
              <Link onClick={link.onClick} className={cn("link", styles.panel__link)} to={link.href}>
                <Text className="noMarginText" color="primary">
                  {link.title}
                </Text>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
