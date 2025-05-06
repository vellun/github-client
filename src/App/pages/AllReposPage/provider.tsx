import { FiltersContext } from "components/FiltersSection/context";
import { orgReposFilterOptions } from "config/filterOptions";
import { AllReposStore } from "store/AllReposStore";
import { ReposContext, useReposPageStore } from "./context";

export const ReposProvider = ({ ownerLogin, children }: { ownerLogin?: string; children: React.ReactNode }) => {
  const store = new AllReposStore();
  store.setOwnerLogin(ownerLogin);
  store.init();
  return <ReposContext.Provider value={{ store }}>{children}</ReposContext.Provider>;
};

export const ReposFiltersProvider = ({ children }: { children: React.ReactNode }) => {
  const reposStore = useReposPageStore();

  return (
    <FiltersContext.Provider
      value={{
        inputPlaceholder: "Enter organization name",
        pageStore: reposStore,
        options: orgReposFilterOptions,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
