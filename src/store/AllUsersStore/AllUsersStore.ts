import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from "mobx";

import { RepoOwnerModel } from "store/models";
import { Collection } from "utils/collection";
import { Meta } from "utils/meta";

import UsersService from "api/UsersService";
import { IStoreWithReaction } from "store/interfaces";
import { filtersStore, FiltersType, PaginationStore, rootStore } from "store/RootStore";

export class AllUsersStore implements IStoreWithReaction {
    _users: Collection<number, RepoOwnerModel> = new Collection();
    pagination: PaginationStore;
    meta: Meta = Meta.initial;

    currentPage: number = 1;
    perPage: number = 6;

    constructor() {
        this.pagination = new PaginationStore();
        makeObservable(this, {
            _users: observable,
            meta: observable,
            fetch: action.bound,
            setMeta: action.bound,
            users: computed,
        });
    }

    init() {
        this.fetch();
    }

    async fetch(): Promise<void> {
        this.setMeta(Meta.loading);
        this._users.clear();
        const params = rootStore.query.getApiUsersParams();

        const { isError, data } = await UsersService.getAll(params);
        if (isError) {
            this.setMeta(Meta.error);
            return;
        }

        runInAction(() => {
            this.meta = Meta.success;

            this._users.setAll(data.order, data.entities);
        });
    }

    get users(): RepoOwnerModel[] {
        return this._users.getAll;
    }

    setMeta(newMeta: Meta) {
        this.meta = newMeta;
    }

    private readonly _filterChangeReaction: IReactionDisposer = reaction(
        () => rootStore.query.getParam("filter"),
        (filter) => {
            if (filter !== null && filtersStore.filterType === FiltersType.users) {
                this.fetch();
            }
        },
    );

    private readonly _pageChangeReaction: IReactionDisposer = reaction(
        () => rootStore.query.getParam("page"),
        (page) => {
            if (page !== null) {
                this.fetch();
            }
        },
    );

    destroy(): void {
        this._filterChangeReaction();
        this._pageChangeReaction();
    }
}
