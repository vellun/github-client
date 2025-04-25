import { useFiltersContext, useFilterStore } from "components/FiltersSection/context";
import { MultiDropdown, Option } from "components/MultiDropdown";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect } from "react";
import styles from "./Filters.module.scss";

export const Filters = observer(() => {
  const context = useFiltersContext();
  const store = useFilterStore();
  const pageStore = context?.pageStore;

  useEffect(() => {
    return () => {
      store?.setFilter("", null);
    };
  }, [store]);

  const handleSelect = (selectedOptions: Option[]) => {
    const selectedType = selectedOptions.at(-1)?.key;

    if (selectedType) {
      store.setFilter(selectedType, context?.filterType);
    }

    pageStore?.pagination.setPage(1);
  };

  const getTitle = useCallback((values: Option[]) => {
    return values.length === 0 ? "Type" : values.map(({ value }) => value).join(", ");
  }, []);

  return (
    <MultiDropdown
      className={styles.root}
      options={context?.options}
      value={store.filter ? [{ key: store.filter, value: store.filter }] : []}
      onChange={handleSelect}
      getTitle={getTitle}
    />
  );
});
