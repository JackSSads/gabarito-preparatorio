import { API } from "../axiosConfig";

import { ILogin, IRegister, IResMessageLogin, IResMessageRegister } from "@/types/auth";

const login = async ({
    email, password
}: ILogin): Promise<IResMessageLogin> => {
    try {

        const payload = { email, password };

        const res = await API.post("/api/auth/login", payload);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id_user", res.data.id_user);

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

const register = async ({
    email, name, password, phone, role = "TEMP_USER"
}: IRegister): Promise<IResMessageRegister> => {
    try {

        const payload = { email, name, password, phone, role };

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

export const AuthService = {
    login,
    register
};