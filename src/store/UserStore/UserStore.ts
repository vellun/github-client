import UsersService from "api/UsersService";
import { makeAutoObservable, runInAction } from "mobx";
import { rootStore } from "store/RootStore";
import { RepoModel } from "store/models";
import { UserModel } from "store/models/users";
import { Collection } from "utils/collection";
import { Meta } from "utils/meta";

export class UserStore {
  _user: UserModel | null = null;
  _repos: Collection<number, RepoModel> = new Collection();
  _isCurrent: boolean = false;
  userMeta: Meta = Meta.initial;
  reposMeta: Meta = Meta.initial;

  constructor() {
    makeAutoObservable(this);
  }

  init(login: string) {
    if (rootStore.auth.user && login === rootStore.auth.user.login) {
      this.setIsCurrent(true);
      rootStore.auth.fetchRepos();
    } else {
      this.fetchUser(login);
      this.fetchRepos(login);
    }
  }

  async fetchUser(login: string): Promise<void> {
    runInAction(() => {
      this.userMeta = Meta.loading;
      this._user = null;
    });

    const { isError, data } = await UsersService.getByLogin(login);
    if (isError) {
      this.setUserMeta(Meta.error);
      return;
    }

    runInAction(() => {
      this.userMeta = Meta.success;
      this._user = data;

      if (this._user.login === rootStore.auth.user?.login) {
        this.setIsCurrent(true);
      }
    });
  }

  get user(): UserModel | null {
    return this._user;
  }

  get isCurrent(): boolean {
    return this._isCurrent;
  }

  setUserMeta(newMeta: Meta) {
    this.userMeta = newMeta;
  }

  setIsCurrent(newIsCurrent: boolean) {
    this._isCurrent = newIsCurrent;
  }

  async fetchRepos(login: string): Promise<void> {
    runInAction(() => {
      this.reposMeta = Meta.loading;
      this._repos.clear();
    });

    const { isError, data } = await UsersService.getRepos(login);
    if (isError) {
      this.setUserMeta(Meta.error);
      return;
    }

    runInAction(() => {
      this.reposMeta = Meta.success;
      this._repos.setAll(data.order, data.entities);
    });
  }

  get repos(): RepoModel[] | null {
    return this._repos.getAll;
  }
}
