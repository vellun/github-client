import axios from "axios";

import { apiUrls } from "config/apiUrls";
import { GithubRepoModel, normalizeGithubReposToCollection } from "store/models";
import { ApiResp } from "utils/apiTypes";
import { CollectionT } from "utils/collection";

export const requestGithubRepos = async (
  organization: string,
  type: string,
  page: number,
  perPage: number,
): Promise<ApiResp<CollectionT<number, GithubRepoModel>>> => {
  // Ладно, оставлю это пока тут
  const token = "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";

  try {
    const response = await axios(apiUrls.github.organizationRepos(organization), {
      headers: {
        Authorization: `token ${token}`,
      },
      params: {
        type: type,
        page: page,
        per_page: perPage,
      },
    });
    return {
      isError: false,
      data: normalizeGithubReposToCollection(response.data),
    };
  } catch (e) {
    console.log(e);
    return {
      isError: true,
      data: null,
    };
  }
};
