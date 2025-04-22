import { makeAutoObservable, runInAction } from "mobx";
import bcrypt from 'bcryptjs';
import { Meta } from "utils/meta";
import AuthService from "api/AuthService";

export class AuthStore {
  user: string | null = null;
  token: string | null = null;
  meta: Meta = Meta.initial;

  constructor() {
    makeAutoObservable(this);
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      this.user = storedUser;
      this.token = storedToken;
    }
  }

  register = async (email: string, login: string, password: string) => {
    runInAction(() => {
      this.meta = Meta.loading;
      this.user = null;
    });

    const { isError, data } = await AuthService.Register({ email: email, username: login, password: password });
    if (isError) {
      this.setMeta(Meta.error);
      return;
    }

    runInAction(() => {
      this.meta = Meta.success;
      this.user = login;

      console.log("SS", login)
    });
  };

  logout = () => {
    this.user = null;
    localStorage.removeItem('user');
  };

  login = async (login: string, password: string) => {
    runInAction(() => {
      this.meta = Meta.loading;
      this.user = null;
    });

    const { isError, data } = await AuthService.Login({ username: login, password: password });
    if (isError) {
      this.setMeta(Meta.error);
      return;
    }

    runInAction(() => {
      this.meta = Meta.success;
      this.user = login;

      console.log("SS", data)
    });
  };

  setMeta(newMeta: Meta) {
    this.meta = newMeta;
  }
}
