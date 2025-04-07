import React from 'react';
import { IconProps } from './Icon';
import CheckIcon from './CheckIcon';
import ArrowDownIcon from './ArrowDownIcon';

export default {
  title: 'Icons',
  argTypes: {
    className: {
      control: 'text',
    },
    color: {
      options: ['primary', 'secondary', 'accent'],
      mapping:  ['primary', 'secondary', 'accent'],
      control: 'select'
    },
    width: {
      control: 'number'
    },
    height: {
      control: 'number'
    },
  },
};

export const Default = (props: IconProps) => (
    <div style={{ display: 'flex', gap: '20px'}}>
      <CheckIcon {...props} />
      <ArrowDownIcon {...props} />
    </div>
);
