import { action, IReactionDisposer, makeObservable, observable, reaction } from "mobx";
import { ParsedQs } from "qs";
import { rootStore } from "store/RootStore";

export class SearchStore {
  search: string | ParsedQs | (string | ParsedQs)[] | undefined = rootStore.query.getParam("search");

  constructor() {
    makeObservable(this, {
      search: observable,
      setSearch: action,
    });
  }

  setSearch(newSearch: string) {
    if (this.search !== newSearch) {
      this.search = newSearch;
    }
  }

  getSearch() {
    return this.search;
  }

  destroy(): void {
    this._qpReaction();
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => this.search,
    (search) => {
      // Здесь обновляются квери при введении значения в инпут
      if (rootStore.query.updateQueryParam !== null) {
        rootStore.query.updateQueryParam({ search: search });
      }
    },
  );
}
