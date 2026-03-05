import axios from "axios";
import { RepoApiModel, RepoModel } from "store/models";
import { getCookie } from "typescript-cookie";
import { ApiResp } from "utils/apiTypes";

export const fetch = async (
  url: string,
  params: object = {},
  headers: object = {},
  method: "get" | "post" = "get",
): Promise<ApiResp<RepoModel>> => {
  const token = getCookie("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    let response = "";
    if (method === "post") {
      response = await axios.post(url, params, { headers: headers });
    } else {
      response = await axios(url, {
        headers: headers,
        params: params,
      });
    }

    return {
      isError: false,
      data: response.data,
      headers: response.headers,
    };
  } catch (e) {
    console.log(e);
    return {
      isError: true,
      data: e.response.data.errors,
      headers: null,
    };
  }
};
