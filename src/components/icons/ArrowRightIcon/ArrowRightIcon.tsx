import * as React from "react";
import { Icon, IconProps } from "../Icon";
import styles from "./../Icons.module.scss";

export const ArrowRightIcon: React.FC<IconProps> = ({ color = "primary", ...props }) => (
  <Icon viewBox="0 0 32 32" {...props}>
    <path
      className={styles[`icon__stroke-${color}`]}
      d="M20.62 26.5599L11.9267 17.8666C10.9 16.8399 10.9 15.1599 11.9267 14.1333L20.62 5.43994"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
