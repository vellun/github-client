const githubApi = (endpoint: string): string => `https://api.github.com/${endpoint}`;

export const apiUrls = {
  repos: {
    organizationRepos: (orgName: string): string => githubApi(`orgs/${orgName}/repos`),
    repoByName: (orgName: string, repoName: string): string => githubApi(`repos/${orgName}/${repoName}`),
    repoContributors: (orgName: string, repoName: string): string =>
      githubApi(`repos/${orgName}/${repoName}/contributors`),
    repoReadme: (orgName: string, repoName: string): string => githubApi(`repos/${orgName}/${repoName}/readme`),
    repoLanguages: (orgName: string, repoName: string): string => githubApi(`repos/${orgName}/${repoName}/languages`),
  },
  users: {
    currentUser: (): string => githubApi(`user`),
    users: (): string => githubApi(`users`),
    userByLogin: (login: string): string => githubApi(`users/${login}`),
    userRepos: (login: string): string => githubApi(`users/${login}/repos`),
  },
  search: {
    users: (): string => githubApi(`search/users`),
    repos: (): string => githubApi(`search/repositories`),
  },
};
