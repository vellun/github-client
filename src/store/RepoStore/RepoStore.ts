import ReposService from "api/ReposService";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { toast } from "react-toastify";
import { CreateRepoModel, RepoModel, RepoOwnerModel } from "store/models";
import { Collection } from "utils/collection";
import { Meta } from "utils/meta";

export class RepoStore {
  _repo: RepoModel | null = null;
  _readme: string | null = null;
  _contributors: Collection<number, RepoOwnerModel> = new Collection();
  _languages: object | null = null;
  repoMeta: Meta = Meta.initial;
  readmeMeta: Meta = Meta.initial;
  contributorsMeta: Meta = Meta.initial;
  languagesMeta: Meta = Meta.initial;

  constructor() {
    makeObservable(this, {
      _repo: observable,
      _readme: observable,
      _contributors: observable,
      _languages: observable,
      repoMeta: observable,
      readmeMeta: observable,
      contributorsMeta: observable,
      fetchRepo: action.bound,
      fetchReadme: action.bound,
      fetchLanguages: action.bound,
      repo: computed,
      readme: computed,
      contributors: computed,
      languages: computed,
    });
  }

  init(orgName: string, repoName: string) {
    this.fetchRepo(orgName, repoName);
    this.fetchContributors(orgName, repoName);
    this.fetchReadme(orgName, repoName);
    this.fetchLanguages(orgName, repoName);
  }

  async fetchRepo(orgName: string, repoName: string): Promise<void> {
    runInAction(() => {
      this.repoMeta = Meta.loading;
      this._repo = null;
    });

    const { isError, data } = await ReposService.getByRepoName(orgName, repoName);
    if (isError) {
      this.setRepoMeta(Meta.error);
      return;
    }

    runInAction(() => {
      this.repoMeta = Meta.success;
      this._repo = data;
    });
  }

  async createRepo(repo: CreateRepoModel): Promise<void> {
    runInAction(() => {
      this.repoMeta = Meta.loading;
    });

    const { isError, data } = await ReposService.createRepo(repo);

    if (isError) {
      toast.error("Error: " + data[0].message);
      this.setRepoMeta(Meta.error);
      return;
    }

    runInAction(() => {
      this.repoMeta = Meta.success;
    });

    toast.success("Repo successfully created");
  }

  async fetchReadme(orgName: string, repoName: string): Promise<void> {
    runInAction(() => {
      this.readmeMeta = Meta.loading;
      this._readme = null;
    });

    const { isError, data } = await ReposService.getReadme(orgName, repoName);
    if (isError) {
      this.setReadmeMeta(Meta.error);
      return;
    }

    runInAction(() => {
      this.readmeMeta = Meta.success;
      this._readme = data;
    });
  }

  async fetchLanguages(orgName: string, repoName: string): Promise<void> {
    if (this.languagesMeta === Meta.loading || this.languagesMeta === Meta.success) {
      return;
    }

    runInAction(() => {
      this.languagesMeta = Meta.loading;
      this._languages = null;
    });

    const { isError, data } = await ReposService.getRepoLanguages(orgName, repoName);
    if (isError) {
      this.setLanguagesMeta(Meta.error);
      return;
    }

    runInAction(() => {
      this.languagesMeta = Meta.success;
      this._languages = data;
    });
  }

  async fetchContributors(orgName: string, repoName: string): Promise<void> {
    if (this.contributorsMeta === Meta.loading || this.contributorsMeta === Meta.success) {
      return;
    }

    runInAction(() => {
      this.contributorsMeta = Meta.loading;
      this._contributors.clear();
    });

    const { isError, data } = await ReposService.getContributors(orgName, repoName);
    if (isError) {
      this.setContributorsMeta(Meta.error);
      return;
    }

    runInAction(() => {
      this.contributorsMeta = Meta.success;
      this._contributors.setAll(data.order, data.entities);
    });
  }

  get repo(): RepoModel | null {
    return this._repo;
  }

  get readme(): string | null {
    return this._readme;
  }

  get contributors(): RepoOwnerModel[] | null {
    return this._contributors.getAll;
  }

  get languages(): object | null {
    return this._languages;
  }

  setRepoMeta(newMeta: Meta) {
    this.repoMeta = newMeta;
  }

  setReadmeMeta(newMeta: Meta) {
    this.readmeMeta = newMeta;
  }

  setContributorsMeta(newMeta: Meta) {
    this.contributorsMeta = newMeta;
  }

  setLanguagesMeta(newMeta: Meta) {
    this.languagesMeta = newMeta;
  }
}
