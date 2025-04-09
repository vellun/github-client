export const routesConfig = {
  root: "/",
  repositories: {
    mask: "/repositories",
    create: () => "/repositories",
  },
  repoDetail: {
    mask: "/repositories/:orgName/:repoName",
    create: (orgName: string, repoName: string) => `/repositories/${orgName}/${repoName}`,
  },
};
