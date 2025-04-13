import { AllReposStore } from "store/AllReposStore";
import { ReposContext } from "./context";

export const ReposProvider = ({ children }: { children: React.ReactNode }) => {
  const store = new AllReposStore();
  store.init();
  return <ReposContext.Provider value={{ store }}>{children}</ReposContext.Provider>;
};
