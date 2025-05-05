import { makeAutoObservable, reaction } from "mobx";
import { QueryParamsStore } from "store/RootStore/QueryParamsStore";

export class PaginationStore {
  totalPages = 0;
  private _queryStore: QueryParamsStore;

  constructor(queryStore: QueryParamsStore) {
    this._queryStore = queryStore;

    makeAutoObservable(this);

    reaction(
      () => ({
        page: this._queryStore.getParam("page"),
        perPage: this._queryStore.getParam("per_page"),
      }),
      ({ page, perPage }) => {
        if (page !== undefined) {
          this._page = Number(page);
        }
        if (perPage !== undefined) {
          this._perPage = Number(perPage);
        }
      },
      { fireImmediately: true },
    );
  }

  private _page: number = 1;
  private _perPage: number = 6;

  setPage(newPage: number) {
    if (this._page !== newPage) {
      this._page = newPage;
      this._queryStore.updateQueryParams({ page: newPage });
    }
  }

  get page() {
    return this._page;
  }

  get perPage() {
    return this._perPage;
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
