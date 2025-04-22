import UsersService from "api/UsersService";
import { computed, makeObservable, observable, runInAction } from "mobx";
import { RepoModel } from "store/models";
import { UserModel } from "store/models/users";
import { Collection } from "utils/collection";
import { Meta } from "utils/meta";

export class UserStore {
  _user: UserModel | null = null;
  _repos: Collection<number, RepoModel> = new Collection();
  userMeta: Meta = Meta.initial;
  reposMeta: Meta = Meta.initial;

  constructor() {
    makeObservable(this, {
      _user: observable,
      _repos: observable,
      userMeta: observable,
      reposMeta: observable,
      user: computed,
      repos: computed
    });
  }

  init(login: string) {
    this.fetchUser(login);
    this.fetchRepos(login)
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
    });
  }

  get user(): UserModel | null {
    return this._user;
  }

  setUserMeta(newMeta: Meta) {
    this.userMeta = newMeta;
  }

  async fetchRepos(login: string): Promise<void> {
    if (this.reposMeta === Meta.loading || this.reposMeta === Meta.success) {
      return;
    }

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
