import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from "mobx";

import { RepoModel } from "store/models";
import { Collection } from "utils/collection";
import { Meta } from "utils/meta";

import ReposService from "api/ReposService";
import { rootStore } from "store/RootStore";

export class AllReposStore {
  _repos: Collection<number, RepoModel> = new Collection();
  meta: Meta = Meta.initial;

  currentPage: number = 1;
  perPage: number = 6;

  constructor() {
    makeObservable(this, {
      _repos: observable,
      meta: observable,
      fetch: action.bound,
      setMeta: action.bound,
      repos: computed,
    });
  }

  init() {
    this.fetch();
  }

  async fetch(): Promise<void> {
    this.setMeta(Meta.loading);
    this._repos.clear();
    const params = rootStore.query.getApiParams();

    const { isError, data } = await ReposService.getAll(params);
    if (isError) {
      this.setMeta(Meta.error);
      return;
    }

    runInAction(() => {
      this.meta = Meta.success;

      this._repos.setAll(data.order, data.entities);
    });
  }

  get repos(): RepoModel[] {
    console.log("get repos", this._repos);

    return this._repos.getAll;
  }

  setMeta(newMeta: Meta) {
    this.meta = newMeta;
  }

  private readonly _filterChangeReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("filter"),
    (filter) => {
      if (filter !== null) {
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
