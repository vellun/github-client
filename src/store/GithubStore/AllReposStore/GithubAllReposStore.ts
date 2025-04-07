import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from "mobx";

import { GithubRepoModel } from "store/models";
import { CollectionT } from "utils/collection";
import { Meta } from "utils/meta";

import { ILocalStore } from "hooks/useLocal";
import { requestGithubRepos } from "store/GithubStore";
import rootStore from "store/RootStore";

export class GithubAllReposStore implements ILocalStore {
  _repos: CollectionT<number, GithubRepoModel> = {
    order: [],
    entities: {},
  };
  _org: string = "ktsstudio";
  _repoType: string = "all";
  meta: Meta = Meta.initial;

  constructor() {
    makeObservable(this, {
      _repos: observable,
      _org: observable,
      _repoType: observable,
      meta: observable,
      fetch: action.bound,
      setMeta: action.bound,
      setOrg: action.bound,
      setRepoType: action.bound,
      repos: computed,
      org: computed,
      repoType: computed,
    });
  }

  async fetch(): Promise<void> {
    console.log("делаем вброс-запрос", this.org, rootStore.query.getParam("search"));
    // if (this.meta === Meta.loading || this.meta === Meta.success) {
    //   return;
    // }

    let searchRepo = rootStore.query.getParam("search");
    if (!searchRepo || searchRepo === "") {
      searchRepo = this.org;
    }

    let repoType = rootStore.query.getParam("filter");
    if (!repoType || repoType === "") {
      repoType = this.repoType;
    }

    console.log("REPO TYPEEEE", repoType)

    this.setMeta(Meta.loading);
    this._repos = {
      order: [],
      entities: {},
    };

    const { isError, data } = await requestGithubRepos(searchRepo, repoType);
    if (isError) {
      this.setMeta(Meta.error);
      return;
    }

    runInAction(() => {
      this.meta = Meta.success;
      this._repos = data;
    });
  }

  get repos(): GithubRepoModel[] {
    console.log("get repos", this._repos);

    return this._repos.order.map((id) => this._repos.entities[id]);
  }

  get org(): string {
    return this._org;
  }

  get repoType(): string {
    return this._repoType;
  }

  setMeta(newMeta: Meta) {
    this.meta = newMeta;
  }

  setOrg(newOrg: string) {
    this._org = newOrg;
  }

  setRepoType(newType: string) {
    this._repoType = newType;
  }

  // destroy(): void {}

  destroy(): void {
    this._qpReaction();
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => (rootStore.query.getParam("search"), this._org),
    (search) => {
      console.log("search value change", search);
      this.fetch();
    },
  );
}
