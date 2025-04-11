import { Text } from "components/Text";
import { observer } from "mobx-react-lite";
import { GithubAllReposStore } from "store";
import styles from "./Pagination.module.scss";

import cn from "classnames";
import { ArrowRightIcon } from "components/icons/ArrowRightIcon";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";

export const Pagination = observer(({ store }: { store: GithubAllReposStore }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [buttonActive, setbuttonActive] = useState<number | string>(1);

  const totalPages = 9; // TODO: calculate total pages

  const handlePageChange = (newPage: number) => {
    store.setPage(newPage);

    setbuttonActive(newPage);

    const params = new URLSearchParams(location.search);
    params.set("page", newPage.toString());

    navigate(`${location.pathname}?${params.toString()}`);
    store.fetch();
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
        onClick={() => handlePageChange(store.currentPage - 1)}
        disabled={store.currentPage === 1}
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
            <Text className={styles.pagination__numbers__text} view="p-18">{value}</Text>
          </button>
        ))}
      </div>
      <button onClick={() => handlePageChange(store.currentPage + 1)}>
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
