import { API } from "../axiosConfig";
import { IRankingPost, IReqRanking, IResMessage } from "@/types/ranking";

const endpoint = "/api/ranking";

const get_ranking = async (): Promise<IReqRanking[]> => {
    try {
        const res = await API.get(`${endpoint}`);

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

const inset_ranking = async ({
    id_user, score
}: IRankingPost): Promise<IResMessage> => {
    try {
        const payload = { id_user, score };

        const res = await API.post(`${endpoint}`, payload);

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

export const RankingService = {
    get_ranking,
    inset_ranking
};