import { FiltersContext } from "components/FiltersSection/context";
import { usersFilterOptions } from "config/filterOptions";
import { AllUsersStore } from "store/AllUsersStore";
import { FiltersType } from "store/RootStore";
import { filtersStore } from "store";
import { UsersContext, useUsersPageStore } from "./context";

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const store = new AllUsersStore();
  store.init();
  return <UsersContext.Provider value={{ store }}>{children}</UsersContext.Provider>;
};

export const UsersFiltersProvider = ({ children }: { children: React.ReactNode }) => {
  const usersStore = useUsersPageStore();
  return (
    <FiltersContext.Provider
      value={{
        inputPlaceholder: "Enter user login",
        pageStore: usersStore,
        filtersStore: filtersStore,
        options: usersFilterOptions,
        filterType: FiltersType.users,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
