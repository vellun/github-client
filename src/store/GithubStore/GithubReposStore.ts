import { action, computed, makeObservable, observable, reaction, runInAction, IReactionDisposer } from "mobx";

import { GithubRepoModel } from "store/models";
import { CollectionT } from "utils/collection";
import { Meta } from "utils/meta";

import { ILocalStore } from "hooks/useLocal";
import { requestGithubRepos } from "store/GithubStore";

export default class GithubReposStore implements ILocalStore {
  _repos: CollectionT<number, GithubRepoModel> = {
    order: [],
    entities: {},
  };
  meta: Meta = Meta.initial;

  constructor() {
    makeObservable(this, {
      _repos: observable,
      meta: observable,
      fetch: action.bound,
      repos: computed,
    });
  }

  async fetch(): Promise<void> {
    if (this.meta === Meta.loading || this.meta === Meta.success) {
      return;
    }

    this.meta = Meta.loading;
    console.log(">>>>>>>>", this.meta)
    this._repos = {
      order: [],
      entities: {},
    };

    const { isError, data } = await requestGithubRepos("ktsstudio");
    if (isError) {
      this.meta = Meta.error;
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

  destroy(): void {
    this._metaChangedReaction();
  }

  _metaChangedReaction: IReactionDisposer = reaction(
    () => this.meta,
    (...args) => {
      console.log("Reaction", args);
    },
  );
}
