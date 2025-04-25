import { makeAutoObservable } from "mobx";
import qs from "qs";

export class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = "";
  updateQueryParam: ((params: Record<string, string | number | null | number[]>) => string) | null = null;

  constructor() {
    makeAutoObservable(this);
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

  getApiReposParams() {
    return {
      org: this.getParam("search"),
      type: this.getParam("filter"),
      page: this.getParam("page"),
      perPage: this.getParam("per_page"),
    };
  }

  getApiUserReposParams() {
    return {
      repoName: this.getParam("search"),
      type: this.getParam("filter"),
      page: this.getParam("page"),
      perPage: this.getParam("per_page"),
    };
  }

  getApiUsersParams() {
    return {
      type: this.getParam("filter"),
      login: this.getParam("search"),
      since: (Number(this.getParam("page")) - 1) * Number(this.getParam("per_page")),
      perPage: this.getParam("per_page"),
    };
  }
}
