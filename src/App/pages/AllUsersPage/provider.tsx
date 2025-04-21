import { FiltersContext } from "components/FiltersSection/context";
import { usersFilterOptions } from "config/filterOptions";
import { AllUsersStore } from "store/AllUsersStore";
import { FiltersType } from "store/RootStore";
import { filtersStore } from "store/RootStore/FiltersStore/instance";
import { searchStore } from "store/RootStore/SearchStore/instance";
import { UsersContext, useUsersPageStore } from "./context";

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const store = new AllUsersStore();
  store.init();
  return <UsersContext.Provider value={{ store }}>{children}</UsersContext.Provider>;
};

export const UsersFiltersProvider = ({ children }: { children: React.ReactNode }) => {
  const usersStore = useUsersPageStore()
  return <FiltersContext.Provider value={{ pageStore: usersStore, filtersStore: filtersStore, searchStore: searchStore, options: usersFilterOptions, filterType: FiltersType.users }}>{children}</FiltersContext.Provider>;
};
