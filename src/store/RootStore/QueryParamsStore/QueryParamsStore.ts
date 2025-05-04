import { makeAutoObservable, toJS } from "mobx";
import qs from "qs";
import { NavigateFunction } from "react-router-dom";
import { updateQueryParam } from "utils/updateQueryParam";

export class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = "";
  private _navigate: NavigateFunction | null = null;

  constructor() {
    makeAutoObservable<QueryParamsStore>(this);
  }

  getParam(key: string): undefined | string | qs.ParsedQs | (string | qs.ParsedQs)[] {
    console.log("PAGEEEEEE222", toJS(this._params))
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

  initParams() {
    if (this.getParam("per_page") === undefined) {
      const searchParams = updateQueryParam({ per_page: 6 });
      this.setSearch(searchParams);
    }
    if (this.getParam("page") === undefined) {
      const searchParams = updateQueryParam({ page: 1 });
      this.setSearch(searchParams);
    }
    if (this.getParam("search") === undefined) {
      const searchParams = updateQueryParam({ search: "ktsstudio" });
      this.setSearch(searchParams);
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
