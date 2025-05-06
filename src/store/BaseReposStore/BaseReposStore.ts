import { action, makeObservable, observable, reaction } from "mobx";

import { RepoModel } from "store/models";
import { Collection } from "utils/collection";
import { Meta } from "utils/meta";

import { FiltersStore } from "store/FiltersStore";
import { PaginationStore } from "store/RootStore";
import { QueryParamsStore } from "store/RootStore/QueryParamsStore";

export abstract class BaseReposStore {
  _repos: Collection<number, RepoModel> = new Collection();
  pagination: PaginationStore;
  query: QueryParamsStore;
  filters: FiltersStore;
  meta: Meta = Meta.initial;

  constructor() {
    this.query = new QueryParamsStore();
    this.pagination = new PaginationStore(this.query);
    this.filters = new FiltersStore(this.query);

    makeObservable(this, {
      _repos: observable,
      pagination: observable,
      query: observable,
      filters: observable,
      meta: observable,
      setMeta: action,
      init: action,
      fetch: action,
    });

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
    );
  }

  init() {
    console.log("BASE REPOS STORE INIT");
    this.fetch();
  }

  abstract fetch(): Promise<void>;

  get repos(): RepoModel[] {
    return this._repos.getAll;
  }

  setMeta(newMeta: Meta) {
    this.meta = newMeta;
  }
}
