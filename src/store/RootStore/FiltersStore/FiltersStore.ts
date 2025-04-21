import { makeAutoObservable } from "mobx";
import { ParsedQs } from "qs";
import { FiltersType, rootStore } from "store/RootStore";


export class FiltersStore {
  filter: string | ParsedQs | (string | ParsedQs)[] | undefined = rootStore.query.getParam("filter");
  filterType: FiltersType

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setFilter(newFilter: string) {
    if (this.filter !== newFilter) {
      this.filter = newFilter

      if (rootStore.query.updateQueryParam !== null) {
        rootStore.query.updateQueryParam({ filter: newFilter })
      }
    }
  }

  setReposFilter(newFilter: string) {
    this.setFilter(newFilter)
    this.filterType = FiltersType.repos
  }

  setUsersFilter(newFilter: string) {
    this.setFilter(newFilter)
    this.filterType = FiltersType.users

  }
}
