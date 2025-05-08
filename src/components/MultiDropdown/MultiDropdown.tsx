import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { ArrowDownIcon } from "../icons/ArrowDownIcon";
import { Input } from "../Input";
import styles from "./MultiDropdown.module.scss";

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

export const MultiDropdown: React.FC<MultiDropdownProps> = (props: MultiDropdownProps) => {
  const { options, value, onChange, disabled, getTitle, className } = props;

  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleclickOutside = (event: MouseEvent) => {
    if (!dropdownRef.current) return;

    const isOpen = dropdownRef.current.contains(event.target as Node);
    setIsOpen(isOpen);
  };

  useEffect(() => {
    window.document.addEventListener("click", handleclickOutside);
    return () => {
      window.document.removeEventListener("click", handleclickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) return setSearch("");

    setSearch(value.length ? getTitle(value) : "");
  }, [isOpen, getTitle, value, setSearch]);

  const items = options
    .filter((option) => {
      if (search === null) return true;
      return option.value.toLocaleLowerCase().startsWith(search.toLocaleLowerCase());
    })
    .map((option) => {
      const isSelected = value.map((v) => v.key).includes(option.key);

      return (
        <div
          className={classNames(
            styles["dropdown__category-menu__item"],
            isSelected && styles["dropdown__category-menu__item_selected"],
          )}
          onClick={() => {
            if (isSelected) {
              onChange(value.filter((v) => v.key !== option.key));
            } else {
              onChange([...value, option]);
            }
            setIsOpen(false);
          }}
          key={option.key}
        >
          {option.value}
        </div>
      );
    });

  return (
    <div className={classNames(styles.dropdown, className)} ref={dropdownRef}>
      <Input
        disabled={disabled}
        onChange={(value) => {
          setSearch(value);
        }}
        value={search}
        className={styles.dropdown__category}
        placeholder={getTitle(value)}
        afterSlot={<ArrowDownIcon color="secondary" />}
      />
      {isOpen && !disabled && <div className={styles["dropdown__category-menu"]}>{items}</div>}
    </div>
  );
};
