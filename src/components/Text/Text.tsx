import * as React from "react";

import styles from "./Text.module.scss";
import cn from "classnames";

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: "title" | "button" | "p-20" | "p-18" | "p-16" | "p-14" | "p-12";
  /** Html-тег */
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "p" | "span";
  /** Начертание шрифта */
  weight?: "normal" | "medium" | "bold";
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: "primary" | "secondary" | "accent";
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({ className, view, tag = "p", weight, color, maxLines, children, ...props }) => {
  const elementRef = React.useRef<HTMLDivElement | HTMLHeadingElement | HTMLParagraphElement>(null);

  React.useEffect(() => {
    if (elementRef.current && maxLines !== undefined) {
      elementRef.current.style.setProperty("-webkit-line-clamp", maxLines.toString());
    }
  }, [maxLines]);

  const inputStyles = {
    fontWeight: weight === "bold" ? 700 : weight === "medium" ? 500 : 400,
    view: view === "button" ? styles.textButton : view === "title" ? styles.textTitle : styles.view,
  };

  const Tag = tag;

  return (
    <Tag
      ref={elementRef}
      className={cn(
        styles.text,
        className,
        inputStyles.view,
        color === "accent"
          ? styles.textAccent
          : color === "secondary"
            ? styles.textSecondary
            : color === "primary"
              ? styles.textPrimary
              : "",
      )}
      style={{
        fontWeight: inputStyles.fontWeight,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Text;
