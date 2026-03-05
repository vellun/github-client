import { createContext, useContext } from "react";
import { UserStore } from "store/UserStore";

export type UserContextType = {
  store: UserStore;
};

export const UserContext = createContext<UserContextType | null>(null);

export const useUserPageStore = () => {
  const usersContext = useContext(UserContext);
  return usersContext?.store;
};

