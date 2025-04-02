import * as React from "react";
import cn from "classnames";
import Icon, { IconProps } from "../Icon";
import styles from "./../Icons.module.scss";

const CheckIcon: React.FC<IconProps> = ({ color, ...props }) => (
  <Icon {...props}>
    <path
      className={cn(
        color === "accent"
          ? styles.IconStrokeAccent
          : color === "secondary"
            ? styles.IconStrokeSecondary
            : styles.IconStrokePrimary,
      )}
      d="M4 11.6129L9.87755 18L20 7"
      strokeWidth="2"
    />
  </Icon>
);

export default CheckIcon;
