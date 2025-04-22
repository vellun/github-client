import { CollectionT } from "utils/collection";
import { RepoOwnerModel } from "./repoOwner";

export type RepoOwnerApiModel = {
  id: number;
  login: string;
  avatar_url: string;
  type: string;
};

export const normalizeRepoOwnerModel = (raw: RepoOwnerApiModel): RepoOwnerModel => ({
  id: raw.id,
  login: raw.login,
  avatarUrl: raw.avatar_url,
  type: raw.type
});

export const normalizeRepoOwnersToCollection = (rawList: RepoOwnerApiModel[]): CollectionT<number, RepoOwnerModel> => {
  return {
    order: rawList.map((item) => item.id),
    entities: rawList.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: normalizeRepoOwnerModel(item),
      }),
      {},
    ),
  };
};
