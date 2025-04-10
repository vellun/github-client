import axios from "axios";

import { apiUrls } from "config/apiUrls";
import { GithubRepoModel, normalizeGithubRepoModel } from "store/models";
import { ApiResp } from "utils/apiTypes";

export const requestGithubRepoByName = async (orgName: string, repoName: string): Promise<ApiResp<GithubRepoModel>> => {
  const token = "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";
  try {
    const response = await axios(apiUrls.github.repoByName(orgName, repoName), {
      headers: {
        Authorization: `token ${token}`,
      },
    });
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
