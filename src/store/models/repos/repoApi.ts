import { Collection } from "utils/collection";
import { RepoModel } from "./repo";
import { RepoOwnerApiModel, normalizeRepoOwnerModel } from "./repoOwnerApi";

export type RepoApiModel = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  pushed_at: string;
  owner: RepoOwnerApiModel;
  homepage?: string;
  topics: string[];
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  languages: object,
  language: string,
  private: boolean,
};

export const normalizeRepoModel = (raw: RepoApiModel): RepoModel => ({
  id: raw.id,
  name: raw.name,
  description: raw.description,
  htmlUrl: raw.html_url,
  pushedAt: new Date(raw.pushed_at),
  owner: normalizeRepoOwnerModel(raw.owner),
  homepage: raw.homepage,
  topics: raw.topics,
  stargazersCount: raw.stargazers_count,
  watchersCount: raw.watchers_count,
  forksCount: raw.forks_count,
  languages: raw.languages,
  language: raw.language,
  private: raw.private,
});

export const normalizeReposToCollection = (rawList: RepoApiModel[]): Collection<number, RepoModel> => {
  return {
    order: rawList.map((item) => item.id),
    entities: rawList.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: normalizeRepoModel(item),
      }),
      {},
    ),
  };
};
