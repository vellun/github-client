import { UsersApiRequestParams } from "api/types";
import { apiUrls } from "config/apiUrls";
import { normalizeUserModel } from "store/models";
import { RepoModel, RepoOwnerModel, normalizeRepoOwnersToCollection, normalizeReposToCollection } from "store/models";
import { UserModel } from "store/models/users";
import { ApiResp } from "utils/apiTypes";
import { Collection } from "utils/collection";
import { fetch } from "utils/fetch";

const isParam = (param: any) => {
  return param !== undefined && param !== null;
};

export default class UsersService {
  static async getCurrentUser(): Promise<ApiResp<UserModel>> {
    const response = await fetch(apiUrls.users.currentUser());
    return { isError: response.isError, data: normalizeUserModel(response.data), headers: response.headers };
  }

  static async getAll(params: UsersApiRequestParams): Promise<ApiResp<Collection<number, RepoOwnerModel>>> {
    let url = apiUrls.users.users();
    const q = [];

    if (isParam(params.login)) {
      url = apiUrls.search.users();
      q.push(`${params.login} in:login`);
    }

    if (isParam(params.type)) {
      url = apiUrls.search.users();
      q.push(`type:${params.type}`);
    }

    const reqParams = {
      since: params.since,
      per_page: params.perPage,
    };

    if (q.length) {
      reqParams.q = q.join(" ");
    }

    const response = await fetch(url, reqParams);
    let responseData = response.data;

    if (isParam(params.login) || isParam(params.type)) {
      responseData = response.data.items;
    }

    return {
      isError: response.isError,
      data: normalizeRepoOwnersToCollection(responseData),
      headers: response.headers,
    };
  }

  static async getByLogin(login: string): Promise<ApiResp<UserModel>> {
    const response = await fetch(apiUrls.users.userByLogin(login));
    return { isError: response.isError, data: normalizeUserModel(response.data), headers: response.headers };
  }

  static async getRepos(login: string): Promise<ApiResp<Collection<number, RepoModel>>> {
    const response = await fetch(apiUrls.users.userRepos(login));
    return { isError: response.isError, data: normalizeReposToCollection(response.data), headers: response.headers };
  }

  static async getCurrentUserRepos(): Promise<ApiResp<Collection<number, RepoModel>>> {
    const response = await fetch(apiUrls.users.currentUserRepos());
    return { isError: response.isError, data: normalizeReposToCollection(response.data), headers: response.headers };
  }
}
