import { Text } from "components/Text";
import { observer, useLocalObservable } from "mobx-react-lite";
import styles from "./Pagination.module.scss";

import cn from "classnames";
import { ArrowRightIcon } from "components/icons/ArrowRightIcon";
import { useState } from "react";
import { PaginationStore } from "store/RootStore/PaginationStore";

export const Pagination = observer(() => {
  const paginationStore = useLocalObservable(() => new PaginationStore());

  const [buttonActive, setbuttonActive] = useState<number | string>(1);

  const totalPages = 9; // TODO: calculate total pages

  const handlePageChange = (newPage: number) => {
    setbuttonActive(newPage);
    paginationStore.setPage(newPage);
  };

  const handleClick = (value: number | string) => {
    if (value === "...") {
      setbuttonActive(value);
    } else {
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
        <ArrowRightIcon width="32" height="32" />
      </button>
      <div className={styles.pagination__numbers}>
        {[1, 2, 3, "...", totalPages].map((value, index) => (
          <button
            key={index}
            className={cn(styles["pagination__numbers-item"], styles.pagination__item, {
              [styles["pagination__numbers-item_active"]]: value === buttonActive,
            })}
            onClick={() => handleClick(value)}
          >
            <Text className={styles.pagination__numbers__text} view="p-18">
              {value}
            </Text>
          </button>
        ))}
      </div>
      <button onClick={() => handlePageChange(paginationStore.page + 1)}>
        <ArrowRightIcon
          className={cn(styles["pagination__arrow"], styles["pagination__arrow-right"], styles.pagination__item)}
          width="32"
          height="32"
          color="primary"
        />
      </button>
    </div>
  );
});
