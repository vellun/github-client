import { LoginRequestParams, RegisterRequestParams } from "api/types";
import axios from "axios";
import { apiUrls } from "config/apiUrls";
import { LoginModel, normalizeRegisterModel } from "store/models";
import { RegisterModel } from "store/models";
import { ApiResp } from "utils/apiTypes";
import { fetch } from "utils/fetch";

export default class AuthService {
    static async Register(params: RegisterRequestParams): Promise<ApiResp<RegisterModel>> {
        const response = await fetch(apiUrls.auth.register(), params, {}, "post");
        console.log("DDDDDDDDD", response)
            
        return { isError: response.isError, data: normalizeRegisterModel(response.data) };
    }

    static async Login(params: LoginRequestParams): Promise<ApiResp<LoginModel>> {
        const response = await fetch(apiUrls.auth.login(), params, {}, "post");
        return { isError: response.isError, data: response.data };
    }
}