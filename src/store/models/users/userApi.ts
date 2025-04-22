import { UserModel } from "./user";

export type UserApiModel = {
    id: number;
    login: string;
    avatar_url: string;
    name: string;
    type: string;
    company: string;
    location: string;
    blog: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
};

export const normalizeUserModel = (raw: UserApiModel): UserModel => ({
    id: raw.id,
    login: raw.login,
    avatarUrl: raw.avatar_url,
    name: raw.name,
    type: raw.type,
    company: raw.company,
    location: raw.location,
    blog: raw.blog,
    bio: raw.bio,
    publicRepos: raw.public_repos,
    followers: raw.followers,
    following: raw.following,
});