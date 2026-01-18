import { API } from "../axiosConfig";
import { IResMessage, IReqQuestionAnswer } from "@/types/questionAnswer";

const endpoint = "/api/question_answer";

const inser_question_answer = async ({
    id_question, id_user, is_correct, is_timeout, response_time, selected_option_id
}: IReqQuestionAnswer): Promise<IResMessage> => {
    try {
        const payload = { id_question, id_user, is_correct, is_timeout, response_time, selected_option_id };
        
        const res = await API.post(`${endpoint}/${id_user}`, payload);
        
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

export const QuestionAnswerService = {
    inser_question_answer,
};