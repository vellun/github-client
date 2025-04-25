import { makeAutoObservable } from "mobx";
import { ParsedQs } from "qs";
import { FiltersType, rootStore } from "store/RootStore";

export class FiltersStore {
  filter: string | ParsedQs | (string | ParsedQs)[] | undefined = rootStore.query.getParam("filter");
  search: string | ParsedQs | (string | ParsedQs)[] | undefined = rootStore.query.getParam("search");
  filtersType: FiltersType | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setFilter(newFilter: string, filterType: FiltersType | undefined | null) {
    if (this.filter !== newFilter) {
      this.filter = newFilter;

      if (newFilter !== "" && rootStore.query.updateQueryParam !== null) {
        rootStore.query.updateQueryParam({ filter: newFilter });
      }
    }

    if (filterType) {
      this.filtersType = filterType;
    }
  }

  setSearch(newSearch: string, searchType: FiltersType | undefined | null) {
    if (this.search !== newSearch && newSearch) {
      this.search = newSearch;

      if (newSearch !== null && rootStore.query.updateQueryParam !== null) {
        rootStore.query.updateQueryParam({ search: newSearch });
      }
    }

    if (searchType) {
      this.filtersType = searchType;
    }
  }

  getSearch() {
    return this.search;
  }
}
