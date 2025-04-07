import React from 'react';

import Text, { TextProps } from './Text';

export default {
  title: 'Text',
  component: Text,
  argTypes: {
    className: {
      control: 'text',
    },
    view: {
      options: ['title', 'button', 'p-20', 'p-18', 'p-16', 'p-14'],
      mapping: ['title', 'button', 'p-20', 'p-18', 'p-16', 'p-14'],
      control: 'select'
    },
    tag: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'p', 'span'],
      mapping:  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'p', 'span'],
      control: 'select'
    },
    weight: {
      options: ['normal', 'bold'],
      mapping:  ['normal', 'bold'],
      control: 'select'
    },
    color: {
      options: ['primary', 'secondary', 'accent'],
      mapping:  ['primary', 'secondary', 'accent'],
      control: 'select'
    },
    children: {
      type: { name: 'string', required: false },
      defaultValue: 'Some text'
    }
  },
};

export const Default = (props: TextProps) => (
  <Text {...props}/>
);
