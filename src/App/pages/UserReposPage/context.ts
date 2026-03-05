import { createContext, useContext } from "react";
import { UserReposStore } from "store/UserReposStore";

export type UserReposContextType = {
  store: UserReposStore;
};

export const UserReposContext = createContext<UserReposContextType | null>(null);

export const useUserReposPageStore = () => {
  const reposContext = useContext(UserReposContext);
  return reposContext?.store;
};
