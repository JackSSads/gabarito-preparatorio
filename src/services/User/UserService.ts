import { API } from "../axiosConfig";

import { IUserGet, IUserPost, IUserUpdate, IUserDelete, IResMessage } from "@/types/user";

const get = async ({
    name = "", email = "", phone = "", role = "0"
}: IUserGet): Promise<IUserGet[]> => {
    try {

        const params = { name, email, phone, role: role === "0" ? "" : role };

        const res = await API.get("/api/user", { params });

        return res.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || "Erro na resposta da API");
        } else if (error.request) {
            throw new Error("Sem resposta do servidor");
        } else {
            throw new Error(error.message);
        };
    };
};

const create = async ({
    name, email, password, phone, role
}: IUserPost): Promise<IResMessage> => {
    try {
        
        const payload = { name, email, password, phone, role };

        const res = await API.post("/api/user", payload);

        return res.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || "Erro na resposta da API");
        } else if (error.request) {
            throw new Error("Sem resposta do servidor");
        } else {
            throw new Error(error.message);
        };
    };
};

const updateById = async ({
    id_user, name, email, password, phone, role, is_active
}: IUserUpdate): Promise<IResMessage> => {
    try {
        
        const payload = { name, email, password: password && password, phone, role, is_active };

        const res = await API.put(`/api/user/${id_user}`, payload);

        return res.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || "Erro na resposta da API");
        } else if (error.request) {
            throw new Error("Sem resposta do servidor");
        } else {
            throw new Error(error.message);
        };
    };
};

const deleteById = async ({
    id_user
}: IUserDelete): Promise<IResMessage> => {
    try {
        const res = await API.delete(`/api/user/${id_user}`);

        return res.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || "Erro na resposta da API");
        } else if (error.request) {
            throw new Error("Sem resposta do servidor");
        } else {
            throw new Error(error.message);
        };
    };
};

export const UserService = {
    create,
    get,
    updateById,
    deleteById,
};
