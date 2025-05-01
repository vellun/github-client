import React from "react";
import cn from "classnames";
import styles from "./Checkbox.module.scss";
import { CheckIcon } from "components/icons/CheckIcon";

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  onChange: (checked: boolean) => void;
  checked?: boolean;
};

export const CheckBox: React.FC<CheckBoxProps> = ({ className, onChange, disabled, ...props }: CheckBoxProps) => {
  return (
    <label className={cn(className, styles.checkBox, disabled && styles.checkBoxDisabled)}>
      <input
        className={styles.checkBoxInput}
        type="checkbox"
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        {...props}
      />
      <CheckIcon
        className={cn(styles.checkBoxIcon, disabled && styles.checkBoxIconDisabled)}
        width={40}
        height={40}
        color="accent"
      />
    </label>
  );
};
