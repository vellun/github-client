import axios from "axios";

export type User = {
  login: string;
  avatar_url: string;
  name?: string;
};

export type Contributor = Omit<User, "name">;

export default class RepsService {
  static async getByLogin(login: string): Promise<User> {
    const response = await axios.get(`https://api.github.com/users/${login}`);
    return response.data;
  }
  static async getContributors(repoName: string): Promise<Contributor[]> {
    const response = await axios.get(`https://api.github.com/repos/ktsstudio/${repoName}/contributors`);
    return response.data;
  }
}
