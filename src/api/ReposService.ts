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

type ApiRequestParams = {
  org: string | null;
  type: string | null;
  page: number | null;
  perPage: number | null;
};

export default class ReposService {
  static async getAll(params: ApiRequestParams): Promise<ApiResp<Collection<number, RepoModel>>> {
    if (params.org === undefined || params.org === null) {
      params.org = "ktsstudio";
    }

    const response = await fetch(apiUrls.repos.organizationRepos(params.org), {
      type: params.type,
      page: params.page,
      per_page: params.perPage,
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
