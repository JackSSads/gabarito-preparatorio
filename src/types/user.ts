export type TRole = "0" | "ADMIN" | "USER" | "TEMP_USER";
export  type TIsActivate = "0" | "1";

type IStatusUser = "UNLOCKED" | "LOCKED";

export interface IUserGet {
    id_user?: string;
    name?: string;
    email?: string
    phone?: string;
    status?: IStatusUser;
    role?: TRole;
    access_expires_at?: Date;
    is_active?: TIsActivate
};

export interface IUserPost extends IUserGet {
    password?: string;
};

export interface IUserUpdate extends IUserGet, IUserPost { };

export interface IUserDelete {
    id_user: string;
};

export interface IResMessage {
    message: string;
    status: boolean;
};