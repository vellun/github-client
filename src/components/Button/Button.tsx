import cn from "classnames";
import React from "react";

import { Loader } from "components/Loader";
import styles from "./Button.module.scss";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({ loading, children, disabled, className, ...props }) => (
  <button
    className={cn(
      styles.button,
      loading && styles["button-loading"],
      disabled === undefined && loading ? styles["button-loading-disabled"] : "",
      className,
    )}
    disabled={disabled !== undefined ? disabled : loading}
    {...props}
  >
    {loading && <Loader size="s"></Loader>}
    {children}
  </button>
);
