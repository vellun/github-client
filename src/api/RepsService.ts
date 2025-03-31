import axios from "axios";

export default class RepsService {
  static async getAll(limit = 10, page = 1) {
    // https://api.github.com/orgs/ktsstudio/repos
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return response.data;
  }
  static async getByRepoName(repoName) {
    // https://api.github.com/repos/ktsstudio/ + repoName
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
    return response;
  }
}
