import { API } from "../axiosConfig";

import {
    IReqQuestionsGet,
    IReqQuestionPost,
    IReqQuestionsPut,
    IResQuestions,
    IResMessage
} from "@/types/questions";

const endpoint = "/api/question";

const getAll = async ({
    keyword = "", subject = "0", difficulty = "0", random = "", limit = 0, offset = 0
}: IReqQuestionsGet): Promise<IResQuestions[]> => {
    try {
        const params = {
            keyword,
            subject: subject === "0" ? "" : subject,
            difficulty: difficulty === "0" ? "" : difficulty,
            random,
            limit,
            offset
        };

        const res = await API.get(endpoint, { params });

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

const insert = async ({
    correct_answer, difficulty, options, question, subject
}: IReqQuestionPost): Promise<IResMessage> => {
    try {

        const payload = { correct_answer, difficulty, options, question, subject };

        const res = await API.post(endpoint, payload);
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

const delete_by_id = async (id_question: string): Promise<IResMessage> => {
    try {
        const res = await API.delete(`${endpoint}/${id_question}`);
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

const updateQuestion = async ({
    id_question, correct_answer, difficulty, options, question, subject
}: IReqQuestionsPut): Promise<IResMessage> => {
    try {

        const payload = { correct_answer, difficulty, options, question, subject };

        const res = await API.put(`${endpoint}/${id_question}`, payload);
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

export const QuestionService = {
    getAll,
    insert,
    delete_by_id,
    updateQuestion
};