export interface IResMessage {
  message: string;
  status: boolean;
};

export interface IRankingPost {
  id_user: string;
  score: number;
};

export interface IReqRanking {
  position: number;
  name: string;
  score: number;
  quizzes_taken: number;
  average_score: number;
};