import { RepoStore } from "store/RepoStore";
import { RepoContext } from "./context";

export const RepoProvider = ({
  orgName,
  repoName,
  children,
}: {
  orgName: string;
  repoName: string;
  children: React.ReactNode;
}) => {
  const store = new RepoStore();
  store.init(orgName, repoName);
  return <RepoContext.Provider value={{ store }}>{children}</RepoContext.Provider>;
};
