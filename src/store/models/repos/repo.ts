import { RepoOwnerModel } from "./repoOwner";

export type RepoModel = {
  id: number;
  name: string;
  description: string;
  htmlUrl: string;
  pushedAt: Date;
  owner: RepoOwnerModel;
  homepage?: string;
  topics: string[];
  stargazersCount: number;
  watchersCount: number;
  forksCount: number;
  languages: object;
  language: string;
  private: boolean;
};

export type CreateRepoModel = {
  name: string;
  description: string;
  private: boolean;
};
