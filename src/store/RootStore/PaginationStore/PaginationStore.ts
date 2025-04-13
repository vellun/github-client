import { action, IReactionDisposer, makeObservable, observable, reaction } from "mobx";
import { rootStore } from "store/RootStore";

export class PaginationStore {
  page: number = Number(rootStore.query.getParam("page"));

  constructor() {
    makeObservable(this, {
      page: observable,
      setPage: action,
    });
  }

  setPage(newPage: number) {
    if (this.page !== newPage) {
      this.page = newPage;
    }
  }

  destroy(): void {
    this._qpReaction();
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => this.page,
    (page) => {
      if (rootStore.query.updateQueryParam !== null) {
        rootStore.query.updateQueryParam({ page: page });
      }
    },
  );
}
