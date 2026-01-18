import { TRole } from "./user";

export interface ILogin {
    email: string;
    password: string;
};

export interface IRegister extends ILogin {
    name: string;
    phone: string;
    conf_password?: string;
    role?: TRole;
};

export interface IResMessageLogin {
  message: string;
  status: boolean;
  token: string;
  id_user: string;
  name: string;
  role: TRole;
};

export interface IResMessageRegister {
  message: string;
  status: boolean;
  name: string;
};