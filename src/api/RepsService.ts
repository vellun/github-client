import axios from "axios";

export default interface Repo {
  name: string;
  owner: {
    avatar_url: string;
  };
  homepage?: string;
  topics?: string[];
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
}

export default interface Readme {
  content: string;
}

export default class RepsService {
  static async getAll(limit = 10, page = 1): Promise<Repo[]> {
    // TODO: добавить пагинацию
    const response = await axios.get("https://api.github.com/orgs/ktsstudio/repos");
    return response.data;
  }
  static async getByRepoName(repoName: string): Promise<Repo> {
    const response = await axios.get(`https://api.github.com/repos/ktsstudio/${repoName}`);
    return response.data;
  }
  static async getReadme(repoName: string): Promise<Readme> {
    const response = await axios.get(`https://api.github.com/repos/ktsstudio/${repoName}/readme`, {
      headers: {
        Accept: "application/vnd.github.html+json",
      },
    });
    return response.data;
  }
}
