import { orgReposFilterOptions, usersFilterOptions } from "config/filterOptions";
import { createContext, useContext } from "react";
import { AllReposStore } from "store/AllReposStore";
import { AllUsersStore } from "store/AllUsersStore";
import { FiltersType, SearchStore } from "store/RootStore";
import { FiltersStore } from "store/RootStore/FiltersStore";

export type FiltersContextType = {
  options: typeof usersFilterOptions | typeof orgReposFilterOptions;
  filterType: FiltersType;
  filtersStore: FiltersStore;
  searchStore: SearchStore;
  pageStore: AllReposStore | AllUsersStore;
};

export const FiltersContext = createContext<FiltersContextType | null>(null);

export const useFiltersContext = () => {
  const filtersContext = useContext(FiltersContext);
  return filtersContext;
};

export const useFilterStore = () => {
  const filtersContext = useContext(FiltersContext);
  return filtersContext?.filtersStore;
};

export const useSearchStore = () => {
  const filtersContext = useContext(FiltersContext);
  return filtersContext?.searchStore;
};

