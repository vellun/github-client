export type RegisterApiModel = {
    id: number;
    username: string;
    email: string;
    password: string;
};

export type RegisterModel = {
    id: number;
    login: string;
    email: string;
    password: string;
};

export const normalizeRegisterModel = (raw: RegisterApiModel): RegisterModel => ({
    id: raw.id,
    login: raw.username,
    email: raw.email,
    password: raw.password,
  });