import { action, IReactionDisposer, makeObservable, observable, reaction } from "mobx";
import { rootStore } from "store/RootStore";
import { IStoreWithReaction } from "store/interfaces";

export class PaginationStore implements IStoreWithReaction {
  page: number = Number(rootStore.query.getParam("page")) || 1;
  perPage = Number(rootStore.query.getParam("per_page")) || 6;
  totalPages = 0;

  constructor() {
    makeObservable(this, {
      page: observable,
      totalPages: observable,
      setPage: action,
      setTotalPages: action,
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
    this.totalPages = totalPages;
  }

  getPagesArray() {
    if (this.totalPages <= 5) {
      return [...Array(this.totalPages).keys()].map((i) => i + 1);
    }

    if (this.page < 3) {
      return [1, 2, 3, "...", this.totalPages];
    } else if (this.page === 3) {
      return [1, 2, 3, 4, "...", this.totalPages];
    }

    if (this.page === this.totalPages || this.page === this.totalPages - 1) {
      return [1, "...", this.totalPages - 2, this.totalPages - 1, this.totalPages];
    } else if (this.page === this.totalPages - 2) {
      return [1, "...", this.totalPages - 3, this.totalPages - 2, this.totalPages - 1, this.totalPages];
    }

    return [1, "...", this.page - 1, this.page, this.page + 1, "...", this.totalPages];
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
