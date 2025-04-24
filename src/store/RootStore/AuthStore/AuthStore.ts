import { makeAutoObservable } from "mobx";
import { ProfileModel } from "store/models";
import { getCookie, removeCookie, setCookie } from "typescript-cookie";
import { Meta } from "utils/meta";

export class AuthStore {
  private _user: ProfileModel | null = null;
  private _token: string | null = null;
  private _isAuth: boolean = false;
  meta: Meta = Meta.initial;

  constructor() {
    makeAutoObservable(this);

    const token = getCookie("token");
    console.log("INIT  AUTTTT", token);

    if (token) {
      this._token = token;
      // this.fetchProfile();
    }
  }

  login(token: string, user: ProfileModel) {
    setCookie("token", token);
    this.setIsAuth(true);
    this.setUser(user);
  }

  logout() {
    removeCookie("token");
    this.setIsAuth(false);
  }

  setUser(newUser: ProfileModel) {
    this._user = newUser;
  }

  setIsAuth(newIsAuth: boolean) {
    this._isAuth = newIsAuth;
  }

  get user() {
    return this._user;
  }

  get token() {
    return this._token;
  }

  get isAuth() {
    const token = getCookie("token");
    token ? this.setIsAuth(true) : this.setIsAuth(false);
    return this._isAuth;
  }

  setMeta(newMeta: Meta) {
    this.meta = newMeta;
  }
}
