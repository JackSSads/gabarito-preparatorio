import { API } from "../axiosConfig";

const login = async (email: string, password: string) => {
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

export const LoginService = {
    login,
};