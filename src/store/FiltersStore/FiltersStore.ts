import { makeAutoObservable } from "mobx";
import { ParsedQs } from "qs";
import { FiltersType, rootStore } from "store/RootStore";
import { updateQueryParam } from "utils/updateQueryParam";

export class FiltersStore {
  filter: string | ParsedQs | (string | ParsedQs)[] | undefined = rootStore.query.getParam("filter");
  search: string | ParsedQs | (string | ParsedQs)[] = rootStore.query.getParam("search");
  filtersType: FiltersType | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setFilter(newFilter: string, filterType: FiltersType | undefined | null) {
    if (this.filter !== newFilter) {
      this.filter = newFilter;
      updateQueryParam({ filter: newFilter });
    }

    if (filterType) {
      this.filtersType = filterType;
    }
  }

  setSearch(newSearch: string, searchType: FiltersType | undefined | null) {
    if (this.search !== newSearch) {
      this.search = newSearch;
      updateQueryParam({ search: newSearch });
    }

    if (searchType) {
      this.filtersType = searchType;
    }
  }

  getSearch() {
    return this.search;
  }
}
