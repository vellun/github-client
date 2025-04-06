import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { GithubRepoModel } from "store/models";
import { Meta } from "utils/meta";
import { requestGithubRepoByName } from "store/GithubStore";

export class GithubRepoStore {
  _repo: GithubRepoModel | null = null;
  meta: Meta = Meta.initial;

  constructor() {
    makeObservable(this, {
      _repo: observable,
      meta: observable,
      fetch: action.bound,
      repo: computed,
    });
  }

  async fetch(orgName: string, repoName: string): Promise<void> {
    if (this.meta === Meta.loading || this.meta === Meta.success) {
      return;
    }

    runInAction(() => {
      this.meta = Meta.loading;
      this._repo = null;
    });

    const { isError, data } = await requestGithubRepoByName(orgName, repoName);
    if (isError) {
      runInAction(() => {
        this.meta = Meta.error;
      });
      return;
    }

    runInAction(() => {
      this.meta = Meta.success;
      this._repo = data;
    });
  }

  get repo(): GithubRepoModel | null {
    return this._repo;
  }
}
