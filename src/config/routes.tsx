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
  users: {
    mask: "/users",
    create: () => "/users",
  },
  userDetail: {
    mask: "/users/:login",
    create: (login: string) => `/users/${login}`,
  },
  userRepos: {
    mask: "/users/:login/repos",
    create: (login: string) => `/users/${login}/repos`,
  },
  login: {
    mask: "/login",
    create: () => `/login`,
  },
};
