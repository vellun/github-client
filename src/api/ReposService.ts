import { ReposApiRequestParams, UsersApiRequestParams, UsersReposApiRequestParams } from "api/types";
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

const isParam = (param: any) => {
  return param !== undefined && param !== null
}

export default class ReposService {
  static async getAllOrgRepos(params: ReposApiRequestParams, type: "org" | "user", ownerLogin?: string): Promise<ApiResp<Collection<number, RepoModel>>> {
    if (params.org === undefined || params.org === null) {
      params.org = "ktsstudio";
    }

    let url = apiUrls.repos.organizationRepos(params.org)
    if (type == "user" && ownerLogin) {
      url = apiUrls.users.userRepos(ownerLogin)
    }

    const response = await fetch(url, {
      type: params.type,
      per_page: params.perPage,
      page: params.page,

    });

    let pagesCount = 1

    if (response.headers?.link !== undefined) {
      const linkMatchLast = response.headers?.link.match(/page=(\d+)>; rel="last"/)
      const linkMatchPrev = response.headers?.link.match(/page=(\d+)>; rel="prev"/)

      if (linkMatchLast !== null) {
        pagesCount = Number(linkMatchLast[1])
      } else {
        pagesCount = Number(linkMatchPrev[1]) + 1
      }
    }


    return { isError: response.isError, data: normalizeReposToCollection(response.data), pagesCount: pagesCount };
  }

  static async getAllUserRepos(params: UsersReposApiRequestParams, ownerLogin: string): Promise<ApiResp<Collection<number, RepoModel>>> {
    let url = apiUrls.users.userRepos(ownerLogin)
    let q = []

    if (isParam(params.repoName)) {
      url = apiUrls.search.repos()
      q.push(`${params.repoName} in:name user:${ownerLogin}`)
    }

    const reqParams = {
      type: params.type,
      per_page: params.perPage,
      page: params.page,
    }

    if (q.length) {
      reqParams.q = q.join(" ")
    }

    const response = await fetch(url, reqParams);
    let responseData = response.data

    if (isParam(params.repoName)) {
      responseData = response.data.items;
    }

    let pagesCount = 1

    if (response.headers?.link !== undefined) {
      const linkMatchLast = response.headers?.link.match(/page=(\d+)>; rel="last"/)
      const linkMatchPrev = response.headers?.link.match(/page=(\d+)>; rel="prev"/)

      if (linkMatchLast !== null) {
        pagesCount = Number(linkMatchLast[1])
      } else {
        pagesCount = Number(linkMatchPrev[1]) + 1
      }
    }

    return { isError: response.isError, data: normalizeReposToCollection(responseData), pagesCount: pagesCount };
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
