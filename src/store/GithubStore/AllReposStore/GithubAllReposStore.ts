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
    this._qpReaction();
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("search"),
    (search) => {
      console.log("search value change", search);
    },
  );
}
