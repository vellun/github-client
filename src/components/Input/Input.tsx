import React from "react";
import cn from "classnames";

import styles from "./Input.module.scss";

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, onChange, afterSlot, ...props }: InputProps) => (
    <div className={cn(className, styles.input__content)}>
      <input
        type="text"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
      <span className={styles.input__icon}>{afterSlot}</span>
    </div>
  ),
);
