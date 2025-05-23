import { orgReposFilterOptions, usersFilterOptions } from "config/filterOptions";
import { createContext, useContext } from "react";
import { AllReposStore } from "store/AllReposStore";
import { AllUsersStore } from "store/AllUsersStore";
import { FiltersType } from "store/RootStore";

export type FiltersContextType = {
  options: typeof usersFilterOptions | typeof orgReposFilterOptions;
  filterType: FiltersType;
  pageStore: AllReposStore | AllUsersStore;
  inputPlaceholder: string;
};

export const FiltersContext = createContext<FiltersContextType | null>(null);

export const useFiltersContext = () => {
  const filtersContext = useContext(FiltersContext);
  return filtersContext;
};

export const useFilterStore = () => {
  const filtersContext = useContext(FiltersContext);
  return filtersContext?.pageStore.filters;
};
