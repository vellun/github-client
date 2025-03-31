import * as React from 'react';
import cn from 'classnames';
import { IconProps } from '../Icon';
import './../Icons.css';

const CheckIcon: React.FC<IconProps> = ({
  className,
  color,
  width = '24',
  height = '24',
  ...props
}) => (
  <svg
    className={cn(
      className,
      color === 'accent'
        ? 'IconAccent'
        : color === 'secondary'
        ? 'IconSecondary'
        : 'IconPrimary'
    )}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path className="iconPath" d="M4 11.6129L9.87755 18L20 7" strokeWidth="2" />
  </svg>
);

export default CheckIcon;
