import React from "react";
import cn from "classnames";

import { Text } from "components/Text";
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

export const Card: React.FC<CardProps> = ({
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
    <div className={cn(styles.card, className)} onClick={onClick}>
      <img className={styles.cardImage} src={image} alt="Repo's card image"></img>
      <div className={styles.cardBody}>
        {captionSlot && (
          <Text className={cn(styles.cardText, styles.captionSlot)} weight="medium" view="p-14" color="secondary">
            {captionSlot}
          </Text>
        )}
        <Text
          className={cn(styles.cardText, styles.cardTitle)}
          weight="medium"
          view="p-20"
          color="primary"
          maxLines={2}
        >
          {title}
        </Text>
        <Text
          className={cn(styles.cardTitle, styles.cardSubtitle)}
          weight="normal"
          view="p-16"
          color="secondary"
          maxLines={3}
        >
          {subtitle}
        </Text>
        <div className={styles.cardFooter}>
          {contentSlot && (
            <Text className={cn(styles.cardTitle, styles.contentSlot)} weight="bold" view="p-18" color="primary">
              {contentSlot}
            </Text>
          )}
          {actionSlot}
        </div>
      </div>
    </div>
  );
};
