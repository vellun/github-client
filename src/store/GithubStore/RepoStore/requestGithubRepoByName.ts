import axios from "axios";

import { apiUrls } from "config/apiUrls";
import { GithubRepoModel, normalizeGithubRepoModel } from "store/models";
import { ApiResp } from "utils/apiTypes";

export const requestGithubRepoByName = async (orgName: string, repoName: string): Promise<ApiResp<GithubRepoModel>> => {
  try {
    const response = await axios(apiUrls.github.repoByName(orgName, repoName));
    return {
      isError: false,
      data: normalizeGithubRepoModel(response.data),
    };
  } catch (e) {
    console.log(e);
    return {
      isError: true,
      data: null,
    };
  }
};
