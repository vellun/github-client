import { FiltersContext } from "components/FiltersSection/context";
import { userReposFilterOptions } from "config/filterOptions";
import { UserReposStore } from "store/UserReposStore";
import { UserReposContext, useUserReposPageStore } from "./context";

export const UserReposProvider = ({ ownerLogin, children }: { ownerLogin?: string; children: React.ReactNode }) => {
  const store = new UserReposStore();
  store.setOwnerLogin(ownerLogin);
  store.init();
  return <UserReposContext.Provider value={{ store }}>{children}</UserReposContext.Provider>;
};

export const UserReposFiltersProvider = ({ children }: { children: React.ReactNode }) => {
  const reposStore = useUserReposPageStore();

  return (
    <FiltersContext.Provider
      value={{
        inputPlaceholder: "Enter repository name",
        pageStore: reposStore,
        options: userReposFilterOptions,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
