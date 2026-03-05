import { makeAutoObservable, reaction, runInAction } from "mobx";

import { RepoOwnerModel } from "store/models";
import { Collection } from "utils/collection";
import { Meta } from "utils/meta";

import UsersService from "api/UsersService";
import { FiltersStore } from "store/FiltersStore";
import { PaginationStore } from "store/RootStore";
import { QueryParamsStore } from "store/RootStore/QueryParamsStore";

export class AllUsersStore {
  _users: Collection<number, RepoOwnerModel> = new Collection();
  pagination: PaginationStore;
  query: QueryParamsStore;
  filters: FiltersStore;
  meta: Meta = Meta.initial;

  currentPage: number = 1;
  perPage: number = 6;

  constructor() {
    this.query = new QueryParamsStore();
    this.pagination = new PaginationStore(this.query);
    this.filters = new FiltersStore(this.query);

    makeAutoObservable(this);

    reaction(
      () => this.query.getParam("filter"),
      (filter, previousFilter) => {
        if (filter !== previousFilter) {
          this.fetch();
        }
      },
      { fireImmediately: true },
    );
  }

  init() {
    this.fetch();
  }

  async fetch(): Promise<void> {
    this.setMeta(Meta.loading);
    this._users.clear();
    const params = this.query.getApiUsersParams();

    const { isError, data } = await UsersService.getAll(params);
    if (isError) {
      this.setMeta(Meta.error);
      return;
    }

    runInAction(() => {
      this.meta = Meta.success;

      this._users.setAll(data.order, data.entities);
    });
  }

  get users(): RepoOwnerModel[] {
    return this._users.getAll;
  }

  setMeta(newMeta: Meta) {
    this.meta = newMeta;
  }
}
