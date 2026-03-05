import { Text } from "components/Text";
import { observer } from "mobx-react-lite";
import styles from "./Pagination.module.scss";

import cn from "classnames";
import { ArrowRightIcon } from "components/icons/ArrowRightIcon";
import { useEffect, useState } from "react";
import { AllReposStore } from "store/AllReposStore";
import { autorun } from "mobx";

export const Pagination = observer(({ store }: { store: AllReposStore }) => {
  const paginationStore = store.pagination;

  const [buttonActive, setbuttonActive] = useState<number | string>(paginationStore.page);
  const [leftArrowColor, setLeftArrowColor] = useState<"primary" | "secondary" | "accent">("secondary");
  const [rightArrowColor, setRightArrowColor] = useState<"primary" | "secondary" | "accent">("primary");

  const totalPages = paginationStore.totalPages;

  useEffect(() => {
    return autorun(() => {
      setbuttonActive(paginationStore.page);
      setLeftArrowColor(paginationStore.page === 1 ? "secondary" : "primary");
      setRightArrowColor(paginationStore.page === totalPages ? "secondary" : "primary");
    });
  }, [paginationStore.page, totalPages]);

  const handlePageChange = (newPage: number) => {
    setbuttonActive(newPage);
    paginationStore.setPage(newPage);
  };

  const handleClick = (value: number | string) => {
    if (typeof value === "number") {
      handlePageChange(value);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        className={cn(styles.pagination__arrow, styles.pagination__item)}
        onClick={() => handlePageChange(paginationStore.page - 1)}
        disabled={paginationStore.page === 1}
      >
        <ArrowRightIcon color={leftArrowColor} width="32" height="32" />
      </button>
      <div className={styles.pagination__numbers}>
        {paginationStore.getPagesArray().map((value, index) => (
          <button
            key={index}
            className={cn(styles["pagination__numbers-item"], styles.pagination__item, {
              [styles["pagination__numbers-item_active"]]: value === buttonActive,
            })}
            onClick={() => handleClick(value)}
          >
            <Text className={styles.pagination__numbers__text} color="primary" view="p-18">
              {value}
            </Text>
          </button>
        ))}
      </div>
      <button
        className={cn(styles.pagination__arrow, styles.pagination__item)}
        onClick={() => handlePageChange(paginationStore.page + 1)}
        disabled={paginationStore.page === totalPages}
      >
        <ArrowRightIcon className={styles["pagination__arrow-right"]} width="32" height="32" color={rightArrowColor} />
      </button>
    </div>
  );
});
