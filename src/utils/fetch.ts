import axios from "axios";
import { RepoModel } from "store/models";
import { ApiResp } from "utils/apiTypes";

export const fetch = async (url: string, params: any = {}, headers: any = {}): Promise<ApiResp<RepoModel>> => {
  
  try {
    const response = await axios(url, {
      headers: headers,
      params: params,
    });
    return {
      isError: false,
      data: response.data,
      headers: response.headers
    };
  } catch (e) {
    console.log(e);
    return {
      isError: true,
      data: null,
      headers: null
    };
  }
};
