import * as React from "react";
import { Icon, IconProps } from "../Icon";
import styles from "./../Icons.module.scss";

export const CheckIcon: React.FC<IconProps> = ({ color = "primary", ...props }) => (
  <Icon {...props}>
    <path className={styles[`icon__stroke-${color}`]} d="M4 11.6129L9.87755 18L20 7" strokeWidth="2" />
  </Icon>
);

