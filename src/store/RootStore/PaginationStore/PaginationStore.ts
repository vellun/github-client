import { action, IReactionDisposer, makeObservable, observable, reaction } from "mobx";
import { rootStore } from "store/RootStore";
import { IStoreWithReaction } from "store/interfaces";

export class PaginationStore implements IStoreWithReaction {
  page: number = Number(rootStore.query.getParam("page")) || 1;
  perPage = Number(rootStore.query.getParam("per_page")) || 6;
  totalPages = 0

  constructor() {
    makeObservable(this, {
      page: observable,
      totalPages: observable,
      setPage: action,
      setTotalPages: action
    });
  }

  setPage(newPage: number) {
    if (this.page !== newPage) {
      this.page = newPage;
    }

    if (rootStore.query.updateQueryParam !== null) {
      rootStore.query.updateQueryParam({ page: newPage });
    }
  }

  setTotalPages(totalPages: number) {
    this.totalPages = totalPages
  }

  getPagesArray(curPage: number) {
    if (curPage > 3) {

    }

    if (this.totalPages > 4) {
      return [1, 2, 3, "...", this.totalPages]
    }
    return [...Array(this.totalPages).keys()].map(i => i + 1)
  }

  destroy(): void {
    this._qpReaction();
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => this.page,
    (page) => {
      console.log("TTTTTTT", this.page)
      if (rootStore.query.updateQueryParam !== null) {
        rootStore.query.updateQueryParam({ page: page });
      }
    },
  );
}
