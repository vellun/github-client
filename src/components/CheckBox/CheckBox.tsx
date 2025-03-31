import React from 'react';
import CheckIcon from '../icons/CheckIcon';
import cn from 'classnames';
import './Checkbox.css';

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
  checked?: boolean;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  className,
  onChange,
  disabled,
  ...props
}) => {
  return (
    <label
      className={cn(className, 'checkBox', disabled && 'checkBoxDisabled')}
    >
      <input
        className="checkBoxInput"
        type="checkbox"
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        {...props}
      />
      <CheckIcon
        className={cn('checkBoxIcon', disabled && 'checkBoxIconDisabled')}
        width={40}
        height={40}
        color="accent"
      />
    </label>
  );
};

export default CheckBox;
