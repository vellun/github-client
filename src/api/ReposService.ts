import { ReposApiRequestParams, UsersReposApiRequestParams } from "api/types";
import { Buffer } from "buffer";
import { apiUrls } from "config/apiUrls";
import { rootStore } from "store/RootStore";
import {
  CreateRepoModel,
  RepoApiModel,
  RepoModel,
  RepoOwnerModel,
  normalizeRepoModel,
  normalizeRepoOwnersToCollection,
  normalizeReposToCollection,
} from "store/models";
import { ApiResp } from "utils/apiTypes";
import { Collection } from "utils/collection";
import { fetch } from "utils/fetch";

const isParam = (param: string | number) => {
  return param !== undefined && param !== null;
};

export default class ReposService {
  static async getAllOrgRepos(params: ReposApiRequestParams): Promise<ApiResp<Collection<number, RepoModel>>> {
    if (params.org === undefined || params.org === null) {
      params.org = "ktsstudio";
    }

    const url = apiUrls.repos.organizationRepos(params.org);

    const response = await fetch(url, {
      type: params.type,
      per_page: params.perPage,
      page: params.page,
    });

    if (response.isError) {
      return { isError: true, data: response.data };
    }

    let pagesCount = 1;

    if (response.headers?.link !== undefined) {
      const linkMatchLast = response.headers?.link.match(/page=(\d+)>; rel="last"/);
      const linkMatchPrev = response.headers?.link.match(/page=(\d+)>; rel="prev"/);

      if (linkMatchLast !== null) {
        pagesCount = Number(linkMatchLast[1]);
      } else {
        pagesCount = Number(linkMatchPrev[1]) + 1;
      }
    }

    return { isError: response.isError, data: normalizeReposToCollection(response.data), pagesCount: pagesCount };
  }

  static async getAllUserRepos(
    params: UsersReposApiRequestParams,
    ownerLogin: string,
  ): Promise<ApiResp<Collection<number, RepoModel>>> {
    let url = apiUrls.users.userRepos(ownerLogin);

    if (rootStore.auth.user?.login === ownerLogin) {
      url = apiUrls.users.currentUserRepos();
    }

    const q = [];

    if (isParam(params.repoName)) {
      url = apiUrls.search.repos();
      q.push(`${params.repoName} in:name user:${ownerLogin}`);
    }

    const reqParams = {
      type: params.type,
      per_page: params.perPage,
      page: params.page,
    };

    if (q.length) {
      reqParams.q = q.join(" ");
    }

    const response = await fetch(url, reqParams);
    let responseData = response.data;

    if (isParam(params.repoName)) {
      responseData = response.data.items;
    }

    let pagesCount = 1;

    if (response.headers?.link !== undefined) {
      const linkMatchLast = response.headers?.link.match(/page=(\d+)>; rel="last"/);
      const linkMatchPrev = response.headers?.link.match(/page=(\d+)>; rel="prev"/);

      if (linkMatchLast !== null) {
        pagesCount = Number(linkMatchLast[1]);
      } else {
        pagesCount = Number(linkMatchPrev[1]) + 1;
      }
    }

    return { isError: response.isError, data: normalizeReposToCollection(responseData), pagesCount: pagesCount };
  }

  static async getByRepoName(orgName: string, repoName: string): Promise<ApiResp<RepoModel>> {
    const response = await fetch(apiUrls.repos.repoByName(orgName, repoName));

    let data;
    if (!response.isError) {
      data = normalizeRepoModel(response.data as RepoApiModel);
    }

    return { isError: response.isError, data: data };
  }

  static async getReadme(orgName: string, repoName: string): Promise<ApiResp<string>> {
    const response = await fetch(apiUrls.repos.repoReadme(orgName, repoName), { Accept: "application/vnd.github.raw" });

    let readme = "";
    if (!response.isError) {
      readme = Buffer.from(response.data.content, "base64").toString("utf-8");
    }

    return { isError: response.isError, data: readme };
  }

  static async getContributors(orgName: string, repoName: string): Promise<ApiResp<RepoOwnerModel>> {
    const response = await fetch(apiUrls.repos.repoContributors(orgName, repoName));

    return { isError: response.isError, data: normalizeRepoOwnersToCollection(response.data) };
  }

  static async getRepoLanguages(orgName: string, repoName: string): Promise<ApiResp<object>> {
    const response = await fetch(apiUrls.repos.repoLanguages(orgName, repoName));

    return { isError: response.isError, data: response.data };
  }

  static async createRepo(params: CreateRepoModel): Promise<ApiResp> {
    const response = await fetch(apiUrls.repos.createRepo(), params, {}, "post");

    return { isError: response.isError, data: response.data };
  }
}
