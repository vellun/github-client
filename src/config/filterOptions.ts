type FilterOptions = {
  key: string;
  value: string;
};

export const orgReposFilterOptions: FilterOptions[] = [
  { key: "all", value: "all" },
  { key: "public", value: "public" },
  { key: "private", value: "private" },
  { key: "forks", value: "forks" },
  { key: "sources", value: "sources" },
  { key: "member", value: "member" },
];

export const userReposFilterOptions: FilterOptions[] = [
  { key: "all", value: "all" },
  { key: "owner", value: "owner" },
  { key: "member", value: "member" },
];

export const usersFilterOptions: FilterOptions[] = [
  { key: "user", value: "users" },
  { key: "org", value: "organizations" },
];