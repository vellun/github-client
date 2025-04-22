import { createContext, useContext } from "react";
import { AllUsersStore } from "store/AllUsersStore";

export type UsersContextType = {
  store: AllUsersStore;
};

export const UsersContext = createContext<UsersContextType | null>(null);

export const useUsersPageStore = () => {
  const usersContext = useContext(UsersContext);
  return usersContext?.store;
};
