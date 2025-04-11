import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction, toJS } from "mobx";

import { RepoModel } from "store/models";
import { Collection } from "utils/collection";
import { Meta } from "utils/meta";

import ReposService from "api/ReposService";
import { ILocalStore } from "hooks/useLocal";
import rootStore from "store/RootStore";

export class AllReposStore implements ILocalStore {
  _repos: Collection<number, RepoModel> = new Collection();
  _org: string = "ktsstudio";
  _repoType: string = "all";
  meta: Meta = Meta.initial;

  currentPage: number = 1;
  perPage: number = 6;

  constructor() {
    makeObservable(this, {
      _repos: observable,
      _org: observable,
      _repoType: observable,
      meta: observable,
      fetch: action.bound,
      setMeta: action.bound,
      setOrg: action.bound,
      setRepoType: action.bound,
      setPage: action.bound,
      repos: computed,
      org: computed,
      repoType: computed,
      totalPages: computed,
    });
  }

  async fetch(): Promise<void> {
    // if (this.meta === Meta.loading || this.meta === Meta.success) {
    //   return;
    // }

    let searchRepo = rootStore.query.getParam("search");
    if (!searchRepo || searchRepo === "") {
      searchRepo = this.org;
    }

    let repoType = rootStore.query.getParam("filter");
    if (!repoType || repoType === "") {
      repoType = this.repoType;
    }

    let page = rootStore.query.getParam("page");
    if (!page || page === "") {
      page = this.currentPage;
    }

    let perPage = rootStore.query.getParam("per_page");
    if (!perPage || perPage === "") {
      perPage = this.perPage;
    }

    page = Number(page);
    perPage = Number(perPage);

    this.setMeta(Meta.loading);
    // this._repos.order = [];
    // this._repos.entities = {};

    // this._repos.clear();

    const { isError, data } = await ReposService.getAll(searchRepo, repoType, page, perPage);
    if (isError) {
      this.setMeta(Meta.error);
      return;
    }

    runInAction(() => {
      this.meta = Meta.success;

      this._repos.setAll(data.order, data.entities);
    });
  }

  get totalPages(): number {
    return Math.ceil(this._repos.order.length / this.perPage);
  }

  get repos(): RepoModel[] {
    console.log("get repos", this._repos);

    return this._repos.getAll;
  }

  get org(): string {
    return this._org;
  }

  get repoType(): string {
    return this._repoType;
  }

  setMeta(newMeta: Meta) {
    this.meta = newMeta;
  }

  setOrg(newOrg: string) {
    this._org = newOrg;
  }

  setRepoType(newType: string) {
    this._repoType = newType;
  }

  setPage(page: number) {
    this.currentPage = page;
  }

  setPerPage(perPage: number) {
    this.perPage = perPage;
  }

  // destroy(): void {}

  destroy(): void {
    this._qpReaction();
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => (rootStore.query.getParam("search"), this._org),
    (search) => {
      console.log("search value change", search);
      this.fetch();
    },
  );
}
