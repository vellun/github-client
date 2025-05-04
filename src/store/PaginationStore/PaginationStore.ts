import { makeAutoObservable } from "mobx";
import { rootStore } from "store/RootStore";
import { updateQueryParam } from "utils/updateQueryParam";

export class PaginationStore {
  private _page: number = Number(rootStore.query.getParam("page")) || 1;
  perPage = Number(rootStore.query.getParam("per_page")) || 6;
  totalPages = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setPage(newPage: number) {
    if (this._page !== newPage) {
      this._page = newPage;
      updateQueryParam({ page: newPage });
    }
  }

  get page() {
    console.log("PAGEEEEEE", this._page)
    return this._page;
  }

  setTotalPages(totalPages: number) {
    this.totalPages = totalPages;
  }

  getPagesArray() {
    if (this.totalPages <= 5) {
      return [...Array(this.totalPages).keys()].map((i) => i + 1);
    }

    if (this._page < 3) {
      return [1, 2, 3, "...", this.totalPages];
    } else if (this._page === 3) {
      return [1, 2, 3, 4, "...", this.totalPages];
    }

    if (this._page === this.totalPages || this._page === this.totalPages - 1) {
      return [1, "...", this.totalPages - 2, this.totalPages - 1, this.totalPages];
    } else if (this._page === this.totalPages - 2) {
      return [1, "...", this.totalPages - 3, this.totalPages - 2, this.totalPages - 1, this.totalPages];
    }

    return [1, "...", this._page - 1, this._page, this._page + 1, "...", this.totalPages];
  }
}
