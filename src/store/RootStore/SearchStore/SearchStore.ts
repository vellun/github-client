import { action, makeObservable, observable } from "mobx";
import { ParsedQs } from "qs";
import { FiltersType, rootStore } from "store/RootStore";

export class SearchStore {
  search: string | ParsedQs | (string | ParsedQs)[] | undefined = rootStore.query.getParam("search");
  filterType: FiltersType

  constructor() {
    makeObservable(this, {
      search: observable,
      setSearch: action,
      setReposSearch: action.bound,
      setUsersSearch: action.bound,
    });
  }

  setSearch(newSearch: string) {
    if (this.search !== newSearch) {
      this.search = newSearch;

      if (rootStore.query.updateQueryParam !== null) {
        rootStore.query.updateQueryParam({ search: newSearch })
      }
    }
  }

  setReposSearch(newSearch: string) {
    this.setSearch(newSearch)
    this.filterType = FiltersType.repos
  }

  setUsersSearch(newSearch: string) {
    this.setSearch(newSearch)
    this.filterType = FiltersType.users

  }

  getSearch() {
    return this.search;
  }
}
