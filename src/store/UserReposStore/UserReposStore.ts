import { runInAction } from "mobx";

import { Meta } from "utils/meta";

import ReposService from "api/ReposService";
import { BaseReposStore } from "store/BaseReposStore";

export class UserReposStore extends BaseReposStore {
  ownerLogin: string | undefined = undefined;

  constructor() {
    super();
  }

  async fetch(): Promise<void> {
    runInAction(() => {
      this.setMeta(Meta.loading);
      this._repos.clear();
    });

    const userReposParams = this.query.getApiUserReposParams();

    if (!userReposParams.page) {
      userReposParams.page = this.pagination.page;
    }
    if (!userReposParams.perPage) {
      userReposParams.perPage = this.pagination.perPage;
    }

    const { isError, data, pagesCount } = await ReposService.getAllUserRepos(userReposParams, this.ownerLogin);

    if (isError) {
      this.setMeta(Meta.error);
      return;
    }

    runInAction(() => {
      this.meta = Meta.success;

      this._repos.setAll(data.order, data.entities);

      this.pagination.setTotalPages(pagesCount);
    });
  }

  setOwnerLogin(newLogin: string) {
    this.ownerLogin = newLogin;
  }
}
