import axios from "axios";
import { RepoModel } from "store/models";
import { ApiResp } from "utils/apiTypes";

export const fetch = async (url: string, params: any = {}, headers: any = {}): Promise<ApiResp<RepoModel>> => {
  const token = "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";
  headers["Authorization"] = `token ${token}`;

  try {
    const response = await axios(url, {
      headers: headers,
      params: params,
    });
    return {
      isError: false,
      data: response.data,
    };
  } catch (e) {
    console.log(e);
    return {
      isError: true,
      data: null,
    };
  }
};
