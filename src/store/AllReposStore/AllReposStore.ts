import { runInAction } from "mobx";

import { Meta } from "utils/meta";

import ReposService from "api/ReposService";
import { BaseReposStore } from "store/BaseReposStore";

export class AllReposStore extends BaseReposStore {
  ownerLogin: string | undefined = undefined;

  constructor() {
    super();
  }

  async fetch(): Promise<void> {
    runInAction(() => {
      this.setMeta(Meta.loading);
      this._repos.clear();
    });

    const reposParams = this.query.getApiReposParams();

    if (!reposParams.page) {
      reposParams.page = this.pagination.page;
    }
    if (!reposParams.perPage) {
      reposParams.perPage = this.pagination.perPage;
    }

    const { isError, data, pagesCount } = await ReposService.getAllOrgRepos(reposParams, this.type, this.ownerLogin);

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
