import UsersService from "api/UsersService";
import { computed, makeObservable, observable, runInAction } from "mobx";
import { UserModel } from "store/models/users";
import { Meta } from "utils/meta";

export class UserStore {
  _user: UserModel | null = null;
  userMeta: Meta = Meta.initial;

  constructor() {
    makeObservable(this, {
      _user: observable,
      userMeta: observable,
      user: computed,
    });
  }

  init(login: string) {
    this.fetchUser(login);
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
}
