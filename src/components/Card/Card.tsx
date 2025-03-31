import React from 'react';
import cn from 'classnames';

import Text from '../Text';
import styles from "./Card.module.scss";

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  return (
    <div className={cn('card', className)} onClick={onClick}>
      <img className="card__image" src={image} alt="Картинко карточки"></img>
      <div className="card__body">
        {captionSlot && (
          <Text
          className={cn('cardText', 'captionSlot')}
            weight="medium"
            view="p-14"
            color="secondary"
          >
            {captionSlot}
          </Text>
        )}
        <Text
          className={cn('cardText', 'cardTitle')}
          weight="medium"
          view="p-20"
          color="primary"
          maxLines={2}
        >
          {title}
        </Text>
        <Text
          className={cn('cardTitle', 'cardSubtitle')}
          weight="normal"
          view="p-16"
          color="secondary"
          maxLines={3}
        >
          {subtitle}
        </Text>
        <div className="card__footer">
          {contentSlot && (
            <Text
              className={cn('cardTitle', 'contentSlot')}
              weight="bold"
              view="p-18"
              color="primary"
            >
              {contentSlot}
            </Text>
          )}
          {actionSlot}
        </div>
      </div>
    </div>
  );
};

export default Card;
