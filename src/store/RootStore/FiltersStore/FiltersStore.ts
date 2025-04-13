import { action, IReactionDisposer, makeObservable, observable, reaction } from "mobx";
import { ParsedQs } from "qs";
import { rootStore } from "store/RootStore";

export class FiltersStore {
  filter: string | ParsedQs | (string | ParsedQs)[] | undefined = rootStore.query.getParam("filter");

  constructor() {
    makeObservable(this, {
      filter: observable,
      setFilter: action,
    });
  }

  setFilter(newFilter: string) {
    if (this.filter !== newFilter) {
      this.filter = newFilter;
    }
  }

  destroy(): void {
    this._qpReaction();
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => this.filter,
    (filter) => {
      if (rootStore.query.updateQueryParam !== null) {
        rootStore.query.updateQueryParam({ filter: filter });
      }
    },
  );
}
