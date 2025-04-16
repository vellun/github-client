import { action, makeObservable, observable } from "mobx";
import qs from "qs";

type PrivateFields = "_params";

export class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = "";
  updateQueryParam: ((params: Record<string, string | number | null | number[]>) => void) | null = null;

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      setSearch: action,
    });
  }

  getParam(key: string): undefined | string | qs.ParsedQs | (string | qs.ParsedQs)[] {
    return this._params[key];
  }

  setSearch(search: string) {
    search = search.startsWith("?") ? search.slice(1) : search;

    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
    }
  }

  getApiParams() {
    return {
      org: this.getParam("search"),
      type: this.getParam("filter"),
      page: this.getParam("page"),
      perPage: this.getParam("per_page"),
    };
  }
}
