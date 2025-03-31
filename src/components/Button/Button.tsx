import React from "react";
import cn from "classnames";

import styles from "./Button.module.scss";
import Loader from "../Loader";
import Text from "../Text";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ loading, children, disabled, className, ...props }) => (
  <button
    className={cn(
      styles.button,
      loading && styles.ButtonLoading,
      disabled === undefined && loading ? styles.ButtonLoadingDisabled : "",
      className,
    )}
    disabled={disabled !== undefined ? disabled : loading}
    {...props}
  >
    {loading && <Loader className={styles.buttonLoader} size="s"></Loader>}
    <Text view="p-18">{children}</Text>
  </button>
);

export default Button;
