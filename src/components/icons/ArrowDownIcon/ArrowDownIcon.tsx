import * as React from "react";
import { Icon, IconProps } from "../Icon";
import styles from "./../Icons.module.scss";

export const ArrowDownIcon: React.FC<IconProps> = ({ color = "primary", ...props }) => (
  <Icon {...props}>
    <path
      className={styles[`icon__fill-${color}`]}
      d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
    />
  </Icon>
);
