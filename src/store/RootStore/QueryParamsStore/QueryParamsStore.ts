import { makeAutoObservable } from "mobx";
import qs from "qs";
import { NavigateFunction } from "react-router-dom";

export class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = "";
  private _navigate: NavigateFunction | null = null;

  constructor() {
    makeAutoObservable<QueryParamsStore>(this);
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

  setNavigate(navigate: NavigateFunction) {
    this._navigate = navigate;
  }

  get navigate() {
    return this._navigate;
  }

  updateQueryParams = (params: Record<string, string | number | null | number[]>) => {
    const searchParams = new URLSearchParams(window.location.hash.split("?")[1] || "");
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== "" && value !== null) {
        searchParams.set(key, value.toString());
      } else {
        searchParams.delete(key);
      }
    });
    if (this._navigate) {
      this._navigate(`?${searchParams.toString()}`, { replace: true });
    }
  };

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
