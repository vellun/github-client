export type ReposApiRequestParams = {
    org: string | null;
    type: string | null;
    page: number | null;
    perPage: number | null;
};

export type UsersApiRequestParams = {
    login: string | null;
    type: string | null;
    since: number | null;
    perPage: number | null;
};