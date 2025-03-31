import axios from "axios";

export default class RepsService {
  static async getAll(limit = 10, page = 1) {
    // https://api.github.com/orgs/ktsstudio/repos
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return response.data;
  }
  static async getByRepoName(repoName: string) {
    // https://api.github.com/repos/ktsstudio/ + repoName
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
    return response.data;
  }
  static async getReadme(orgName: string, repoName: string) {
    const response = await axios.get(`https://api.github.com/repos/${orgName}/${repoName}/readme`, {
      headers: {
        Accept: "application/vnd.github.html+json",
      },
    });
    return response.data;
  }
}
