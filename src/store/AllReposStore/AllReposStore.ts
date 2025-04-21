import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from "mobx";

import { RepoModel } from "store/models";
import { Collection } from "utils/collection";
import { Meta } from "utils/meta";

import ReposService from "api/ReposService";
import { IStoreWithReaction } from "store/interfaces";
import { filtersStore, FiltersType, rootStore } from "store/RootStore";
import { PaginationStore } from "store/RootStore";

export class AllReposStore implements IStoreWithReaction {
  _repos: Collection<number, RepoModel> = new Collection();
  pagination: PaginationStore;
  meta: Meta = Meta.initial;

  type: "org" | "user" = "org";
  ownerLogin: string | undefined = undefined;

  constructor() {
    this.pagination = new PaginationStore();
    makeObservable(this, {
      _repos: observable,
      meta: observable,
      type: observable,
      fetch: action.bound,
      setMeta: action.bound,
      setType: action,
      setOwnerLogin: action,
      repos: computed,
    });
  }

  init() {
    this.fetch();
  }

  async fetch(): Promise<void> {
    this.setMeta(Meta.loading);
    this._repos.clear();
    const params = rootStore.query.getApiReposParams();

    const { isError, data, pagesCount } = await ReposService.getAll(params, this.type, this.ownerLogin);
    if (isError) {
      this.setMeta(Meta.error);
      return;
    }

    console.log("DATAAAA", data)

    runInAction(() => {
      this.meta = Meta.success;

      this._repos.setAll(data.order, data.entities);

      console.log("REPOOOS", this.repos)
      this.pagination.setTotalPages(pagesCount)
    });
  }

  get repos(): RepoModel[] {
    return this._repos.getAll;
  }

  setMeta(newMeta: Meta) {
    this.meta = newMeta;
  }

  setType(newType: "org" | "user") {
    console.log("SET TYPE", newType)
    this.type = newType;
  }

  setOwnerLogin(newLogin: string) {
    this.ownerLogin = newLogin
  }

  private readonly _filterChangeReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("filter"),
    (filter) => {

      if (filter !== null && filtersStore.filterType === FiltersType.repos) {
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
