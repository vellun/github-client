import React from 'react';
import Button from '../Button';
import Card, { CardProps } from './Card';

export default {
  title: 'Card',
  component: Card,
  argTypes: {
    className: {
      control: 'text',
    },
    image: {
      defaultValue: '/picture.svg',
      control: 'text'
    },
    captionSlot: {
      mapping: {
        'undefined': undefined,
      },
      control: 'text'
    },
    title: {
      mapping: {
        'undefined': undefined,
      },
      control: 'text',
      defaultValue: 'Заголовок карточки в несколько строк Заголовок карточки в несколько строк'
    },
    subtitle: {
      mapping: {
        'undefined': undefined,
      },
      control: 'text',
      defaultValue: 'Описание карточки Описание карточки Описание карточкиОписание карточкиОписание карточки Описание карточки'
    },
    contentSlot: {
      mapping: {
        'undefined': undefined,
      },
      control: 'text'
    },
  },
};

export const Default = (props: CardProps) => (
    <Card {...props} actionSlot={<Button>В корзину</Button>} />
);
