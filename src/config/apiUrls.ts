const githubApi = (endpoint: string): string => `https://api.github.com/${endpoint}`;

export const apiUrls = {
  github: {
    organizationRepos: (name: string): string => githubApi(`orgs/${name}/repos`),
    repoByName: (orgName: string, repoName: string): string => githubApi(`repos/${orgName}/${repoName}`),
  },
};
