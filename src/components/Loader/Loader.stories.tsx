import React from 'react';

import Loader, {  LoaderProps } from './Loader';

export default {
  title: 'Loader',
  component: Loader,
  argTypes: {
    className: {
      control: 'text',
    },
    size: {
      options: [undefined, 'l', 'm', 's'],
      mapping: ['undefined', 'l', 'm', 's'],
      control: 'select'
    },
  },
};

export const Default = (props: LoaderProps) => (
  <Loader {...props}/>
);
