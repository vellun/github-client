import { makeAutoObservable, reaction } from "mobx";
import { QueryParamsStore } from "store/RootStore/QueryParamsStore";
import { FiltersType, rootStore } from "store/RootStore";
import { updateQueryParam } from "utils/updateQueryParam";

export class FiltersStore {
  private _queryStore: QueryParamsStore;

  constructor(queryStore: QueryParamsStore) {
    this._queryStore = queryStore;

    makeAutoObservable(this);

    reaction(
      () => ({
        filter: this._queryStore.getParam("filter"),
        search: this._queryStore.getParam("search"),
      }),
      ({ filter, search }) => {
        if (filter !== undefined) {
          this.filter = filter;
        }
        if (search !== undefined) {
          this.search = search;
        }
      },
      { fireImmediately: true },
    );
  }

  filter: string;
  search: string;

  setFilter(newFilter: string) {
    if (this.filter !== newFilter) {
      this.filter = newFilter;
      this._queryStore.updateQueryParams({ filter: newFilter });
    }
  }

  setSearch(newSearch: string) {
    if (this.search !== newSearch) {
      this.search = newSearch;
      this._queryStore.updateQueryParams({ search: newSearch });
    }
  }

  getSearch() {
    return this.search;
  }
}
