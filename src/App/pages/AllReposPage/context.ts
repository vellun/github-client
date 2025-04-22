import { createContext, useContext } from "react";
import { AllReposStore } from "store/AllReposStore";

export type ReposContextType = {
  store: AllReposStore;
};

export const ReposContext = createContext<ReposContextType | null>(null);

export const useReposPageStore = () => {
  const reposContext = useContext(ReposContext);
  return reposContext?.store;
};
