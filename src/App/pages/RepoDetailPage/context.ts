import { createContext, useContext } from "react";
import { RepoStore } from "store/RepoStore";

export type RepoContextType = {
  store: RepoStore;
};

export const RepoContext = createContext<RepoContextType | null>(null);

export const useRepoPageStore = () => {
  const reposContext = useContext(RepoContext);
  return reposContext?.store;
};

