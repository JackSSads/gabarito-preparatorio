type TSelectedOprionId = string | null;

export interface IResMessage {
  message: string;
  status: boolean;
};

export interface IReqQuestionAnswer {
    id_user: string;
    id_question: string;
    selected_option_id: TSelectedOprionId;
    is_correct: boolean;
    is_timeout: boolean;
    response_time: number; // em segundos
};