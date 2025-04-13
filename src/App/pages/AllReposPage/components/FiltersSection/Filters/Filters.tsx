import { MultiDropdown, Option } from "components/MultiDropdown";
import { filterOptions } from "config/filterOptions";
import { observer, useLocalObservable } from "mobx-react-lite";
import { useCallback } from "react";
import { FiltersStore } from "store/RootStore/FiltersStore";

export const Filters = observer(() => {
  const filtersStore = useLocalObservable(() => new FiltersStore());

  const handleSelect = (selectedOptions: Option[]) => {
    const selectedType = selectedOptions.at(-1)?.key;

    if (selectedType) {
      filtersStore.setFilter(selectedType);
    }
  };

  const getTitle = useCallback((values: Option[]) => {
    return values.length === 0 ? "Type" : values.map(({ value }) => value).join(", ");
  }, []);

  return (
    <MultiDropdown
      options={filterOptions}
      value={filtersStore.filter ? [{ key: filtersStore.filter, value: filtersStore.filter }] : []}
      onChange={handleSelect}
      getTitle={getTitle}
    />
  );
});
