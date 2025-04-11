import { apiUrls } from "config/apiUrls";
import {
  RepoModel,
  RepoOwnerModel,
  normalizeRepoModel,
  normalizeRepoOwnersToCollection,
  normalizeReposToCollection,
} from "store/models";
import { ApiResp } from "utils/apiTypes";
import { Collection } from "utils/collection";
import { fetch } from "utils/fetch";

export default class ReposService {
  static async getAll(
    orgName: string,
    repoType: string,
    page = 1,
    perPage: number,
  ): Promise<ApiResp<Collection<number, RepoModel>>> {
    const response = await fetch(apiUrls.repos.organizationRepos(orgName), {
      type: repoType,
      page: page,
      per_page: perPage,
    });

    return { isError: response.isError, data: normalizeReposToCollection(response.data) };
  }

  static async getByRepoName(orgName: string, repoName: string): Promise<ApiResp<RepoModel>> {
    const response = await fetch(apiUrls.repos.repoByName(orgName, repoName));

    return { isError: response.isError, data: normalizeRepoModel(response.data) };
  }

  static async getReadme(orgName: string, repoName: string): Promise<ApiResp<string>> {
    const response = await fetch(
      apiUrls.repos.repoReadme(orgName, repoName),
      {},
      {
        Accept: "application/vnd.github.html+json",
      },
    );
    return response;
  }

  static async getContributors(orgName: string, repoName: string): Promise<ApiResp<RepoOwnerModel>> {
    const response = await fetch(apiUrls.repos.repoContributors(orgName, repoName));

    return { isError: response.isError, data: normalizeRepoOwnersToCollection(response.data) };
  }
}
