type FilterOptions = {
  key: string;
  value: string;
};

export const filterOptions: FilterOptions[] = [
  { key: "all", value: "all" },
  { key: "public", value: "public" },
  { key: "private", value: "private" },
  { key: "forks", value: "forks" },
  { key: "sources", value: "sources" },
  { key: "member", value: "member" },
];
