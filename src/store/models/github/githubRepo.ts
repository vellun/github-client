import { GithubOwnerModel } from "./githubOwner";

export type GithubRepoModel = {
  id: number;
  name: string;
  description: string;
  htmlUrl: string;
  pushedAt: Date;
  owner: GithubOwnerModel;
  homepage?: string;
  topics: string[];
  stargazersCount: number;
  watchersCount: number;
  forksCount: number;
};
