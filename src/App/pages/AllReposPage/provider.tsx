import { FiltersContext } from "components/FiltersSection/context";
import { orgReposFilterOptions, userReposFilterOptions } from "config/filterOptions";
import { AllReposStore } from "store/AllReposStore";
import { ReposContext, useReposPageStore } from "./context";

export const ReposProvider = ({
  type,
  ownerLogin,
  children,
}: {
  type: "org" | "user";
  ownerLogin?: string;
  children: React.ReactNode;
}) => {
  const store = new AllReposStore();
  store.setType(type);
  store.setOwnerLogin(ownerLogin);
  store.init();
  return <ReposContext.Provider value={{ store }}>{children}</ReposContext.Provider>;
};

export const ReposFiltersProvider = ({ type, children }: { type: "org" | "user"; children: React.ReactNode }) => {
  const reposStore = useReposPageStore();

  let options = orgReposFilterOptions;
  let placeholder = "Enter organization name";
  if (type == "user") {
    options = userReposFilterOptions;
    placeholder = "Enter repository name";
  }

  return (
    <FiltersContext.Provider
      value={{
        inputPlaceholder: placeholder,
        pageStore: reposStore,
        options: options,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
