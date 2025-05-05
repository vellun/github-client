import { makeAutoObservable, reaction, runInAction } from "mobx";

import { RepoModel } from "store/models";
import { Collection } from "utils/collection";
import { Meta } from "utils/meta";

import ReposService from "api/ReposService";
import { FiltersStore } from "store/FiltersStore";
import { PaginationStore } from "store/RootStore";
import { QueryParamsStore } from "store/RootStore/QueryParamsStore";

export class AllReposStore {
  _repos: Collection<number, RepoModel> = new Collection();
  pagination: PaginationStore;
  query: QueryParamsStore;
  filters: FiltersStore;
  meta: Meta = Meta.initial;

  type: "org" | "user" = "org";
  ownerLogin: string | undefined = undefined;

  constructor() {
    this.query = new QueryParamsStore();
    this.pagination = new PaginationStore(this.query);
    this.filters = new FiltersStore(this.query);

    makeAutoObservable(this);

    reaction(
      () => ({
        filter: this.query.getParam("filter"),
        page: this.query.getParam("page"),
      }),
      ({ filter, page }, { filter: previousFilter, page: previousPage }) => {
        if (filter !== previousFilter || page !== previousPage) {
          this.fetch();
        }
      },
      { fireImmediately: true },
    );
  }

  init() {
    console.log("INIIIIIIIT")
    this.fetch();
  }

  async fetch(): Promise<void> {
    runInAction(() => {
      this.setMeta(Meta.loading);
      this._repos.clear();
    });

    const reposParams = this.query.getApiReposParams();
    const userReposParams = this.query.getApiUserReposParams();

    if (!reposParams.page) {
      reposParams.page = this.pagination.page;
    }
    if (!reposParams.perPage) {
      reposParams.perPage = this.pagination.perPage;
    }

    let isError = false,
      data = {},
      pagesCount = 0;
    if (this.type === "org") {
      ({ isError, data, pagesCount } = await ReposService.getAllOrgRepos(reposParams, this.type, this.ownerLogin));
    } else {
      ({ isError, data, pagesCount } = await ReposService.getAllUserRepos(userReposParams, this.ownerLogin));
    }

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

  get repos(): RepoModel[] {
    return this._repos.getAll;
  }

  setMeta(newMeta: Meta) {
    this.meta = newMeta;
  }

  setType(newType: "org" | "user") {
    this.type = newType;
  }

  setOwnerLogin(newLogin: string) {
    this.ownerLogin = newLogin;
  }
}
