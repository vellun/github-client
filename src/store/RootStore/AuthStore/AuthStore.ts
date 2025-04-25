import UsersService from "api/UsersService";
import { makeAutoObservable, runInAction } from "mobx";
import { ProfileModel, RepoModel, UserModel } from "store/models";
import { getCookie, removeCookie, setCookie } from "typescript-cookie";
import { Collection } from "utils/collection";
import { Meta } from "utils/meta";

export class AuthStore {
  private _user: UserModel | null = null;
  private _repos: Collection<number, RepoModel> = new Collection();
  private _token: string | null = null;
  private _isAuth: boolean = false;
  meta: Meta = Meta.initial;

  constructor() {
    makeAutoObservable(this);

    const token = getCookie("token");

    if (token) {
      this._token = token;
      this.fetchCurrentUser();
    }
  }

  async fetchCurrentUser(): Promise<void> {
    runInAction(() => {
      this.meta = Meta.loading;
      this._user = null;
    });

    const { isError, data } = await UsersService.getCurrentUser();
    if (isError) {
      this.setMeta(Meta.error);
      return;
    }

    this.setUser(data);

    runInAction(() => {
      this.meta = Meta.success;
      this._user = data;
    });
  }

  async fetchRepos(): Promise<void> {
    runInAction(() => {
      // this.reposMeta = Meta.loading;
      this._repos.clear();
    });

    console.log("aa");

    const { isError, data } = await UsersService.getCurrentUserRepos();
    // if (isError) {
    //   this.setUserMeta(Meta.error);
    //   return;
    // }

    runInAction(() => {
      // this.reposMeta = Meta.success;
      this._repos.setAll(data.order, data.entities);
    });
  }

  login(token: string, user: ProfileModel) {
    setCookie("token", token);
    this.setIsAuth(true);
    this.setUser(user);
    this.fetchCurrentUser();
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

  get repos(): RepoModel[] | null {
    return this._repos.getAll;
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
