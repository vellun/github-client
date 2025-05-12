import { toJS } from "mobx";
import { RepoModel } from "store/models";

export const getViewedRepos = () => {
  // localStorage.clear()
  const viewedRepos = localStorage.getItem("viewedRepos");
  return viewedRepos ? JSON.parse(viewedRepos) : [];
};

export const addViewedRepo = (repo: RepoModel) => {
  let viewedRepos = getViewedRepos();

  if (viewedRepos.some((r: string) => r.name === repo.name)) {
    return;
  }

  if (viewedRepos.length >= 3 || (viewedRepos[0] !== undefined && viewedRepos[0].name === repo.name)) {
    viewedRepos = viewedRepos.slice(1);
  }

  viewedRepos.push(toJS(repo));

  localStorage.setItem("viewedRepos", JSON.stringify(viewedRepos));
};
