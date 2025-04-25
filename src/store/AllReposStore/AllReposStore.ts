import { IReactionDisposer, makeAutoObservable, reaction, runInAction } from "mobx";

import { RepoModel } from "store/models";
import { Collection } from "utils/collection";
import { Meta } from "utils/meta";

import ReposService from "api/ReposService";
import { IStoreWithReaction } from "store/interfaces";
import { filtersStore, FiltersType, PaginationStore, rootStore } from "store/RootStore";

export class AllReposStore implements IStoreWithReaction {
  _repos: Collection<number, RepoModel> = new Collection();
  pagination: PaginationStore;
  meta: Meta = Meta.initial;

  type: "org" | "user" = "org";
  ownerLogin: string | undefined = undefined;

  constructor() {
    this.pagination = new PaginationStore();
    makeAutoObservable(this);
  }

  init() {
    this.fetch();
  }

  async fetch(): Promise<void> {
    runInAction(() => {
      this.setMeta(Meta.loading);
      this._repos.clear();
    });

    const reposParams = rootStore.query.getApiReposParams();
    const userReposParams = rootStore.query.getApiUserReposParams();

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

  private readonly _filterChangeReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("filter"),
    (filter) => {
      if (filter !== null && filtersStore.filtersType === FiltersType.repos) {
        this.fetch();
      }
    },
  );

  private readonly _pageChangeReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("page"),
    (page) => {
      if (page !== null) {
        this.fetch();
      }
    },
  );

  destroy(): void {
    this._filterChangeReaction();
    this._pageChangeReaction();
  }
}
