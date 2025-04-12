export const routesConfig = {
  root: {
    mask: "/",
    create: () => "/",
  },
  repositories: {
    mask: "/repositories",
    create: () => "/repositories",
  },
  repoDetail: {
    mask: "/repositories/:orgName/:repoName",
    create: (orgName: string, repoName: string) => `/repositories/${orgName}/${repoName}`,
  },
};
