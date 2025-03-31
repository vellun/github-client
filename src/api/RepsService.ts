import axios from "axios";

export default class RepsService {
  static async getAll(limit = 10, page = 1) {
    // TODO: добавить пагинацию
    const response = await axios.get("https://api.github.com/orgs/ktsstudio/repos");
    return response.data;
  }
  static async getByRepoName(repoName) {
    const response = await axios.get(`https://api.github.com/repos/ktsstudio/${repoName}`);
    return response.data;
  }
  static async getReadme(repoName: string) {
    const response = await axios.get(`https://api.github.com/repos/ktsstudio/${repoName}/readme`, {
      headers: {
        Accept: "application/vnd.github.html+json",
      },
    });
    return response.data;
  }
}
