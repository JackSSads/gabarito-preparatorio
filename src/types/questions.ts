export type TDifficulty = "0" | "EASY" | "MEDIUM" | "HARD";
export type TSubject = "0" | "POR" | "MAT";

export interface IResOptions {
  id_question_options: string;
  answer_option: string;
};

export interface IResQuestions {
  id_question: string;
  question: string;
  options: IResOptions[];
  correct_question_id: string;
  difficulty: TDifficulty;
  subject: TSubject;
};

export interface INewQuestion {
  question: string;
  options: string[];
  correct_answer: number;
  difficulty: TDifficulty;
  subject: TSubject;
};

export interface IReqQuestionsGet {
  keyword?: string;
  subject?: TSubject;
  difficulty?: TDifficulty;
  random?: string;
  limit?: number;
  offset?: number;
};

export interface IReqQuestionPost extends INewQuestion { };

export interface IReqQuestionsPut {
  id_question: string;
  question: string;
  options: IResOptions[];
  correct_answer: string;
  difficulty: TDifficulty;
  subject: TSubject;
};

export interface IResMessage {
  message: string;
  status: boolean;
};