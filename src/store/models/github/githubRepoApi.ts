import { CollectionT } from "utils/collection";
import { GithubOwnerApiModel, normalizeGithubOwnerModel } from "./githubOwnerApi";
import { GithubRepoModel } from "./githubRepo";

export type GithubRepoApiModel = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  pushed_at: string;
  owner: GithubOwnerApiModel;
  homepage?: string;
  topics: string[];
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
};

export const normalizeGithubRepoModel = (raw: GithubRepoApiModel): GithubRepoModel => ({
  id: raw.id,
  name: raw.name,
  description: raw.description,
  htmlUrl: raw.html_url,
  pushedAt: new Date(raw.pushed_at),
  owner: normalizeGithubOwnerModel(raw.owner),
  homepage: raw.homepage,
  topics: raw.topics,
  stargazersCount: raw.stargazers_count,
  watchersCount: raw.watchers_count,
  forksCount: raw.forks_count,
});

export const normalizeGithubReposToCollection = (
  rawList: GithubRepoApiModel[],
): CollectionT<number, GithubRepoModel> => {
  return {
    order: rawList.map((item) => item.id),
    entities: rawList.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: normalizeGithubRepoModel(item),
      }),
      {},
    ),
  };
};
