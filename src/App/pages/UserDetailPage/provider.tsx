import { UserStore } from "store/UserStore";
import { UserContext } from "./context";

export const UserProvider = ({
  login,
  children,
}: {
  login: string;
  children: React.ReactNode;
}) => {
  const store = new UserStore();
  store.init(login);
  return <UserContext.Provider value={{ store }}>{children}</UserContext.Provider>;
};
