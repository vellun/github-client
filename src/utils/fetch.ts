import axios from "axios";
import { RepoModel } from "store/models";
import { ApiResp } from "utils/apiTypes";

export const fetch = async (url: string, params: any = {}, headers: any = {}, method: "get" | "post" = "get"): Promise<ApiResp<RepoModel>> => {
  const token = process.env.AUTH_TOKEN
  console.log("TOKEN", token)
  // headers = {
  //   ...headers,
  //   Authorization: `token ${token}`,
  // }
  try {
    let response = ""
    if (method === "post") {
      response = await axios.post(url, {
        headers: headers,
        params: params,
      });
    } else {
      response = await axios(url, {
        headers: headers,
        params: params,
      });
    }

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