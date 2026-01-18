import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, CheckCircle2, XCircle, RotateCcw, Settings } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { RankingService } from "@/services/Ranking/RankingService";

export const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { score, total, answers, questions } = location.state
    || { score: 0, total: 0, answers: [], questions: [] };

  const percentage = Math.round((score / total) * 100);

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { text: "Excelente!", color: "text-success" };
    if (percentage >= 70) return { text: "Muito Bom!", color: "text-info" };
    if (percentage >= 50) return { text: "Bom!", color: "text-warning" };
    return { text: "Continue Estudando!", color: "text-destructive" };
  };

  const performance = getPerformanceMessage();

  useEffect(() => {

    const id_user = localStorage.getItem("id_user");
    const score = localStorage.getItem("score");

    if (!score) return;

    RankingService.inset_ranking({
      id_user: id_user,
      score: Number(score)
    })
      .then((result) => {
        if (result) localStorage.removeItem("score");
      })
      .catch((error) => {
        toast({
          title: "Eita...",
          description: error.message
        });
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-lg border-2 mb-6">
            <div className="text-center mb-8">
              <Trophy className="w-20 h-20 mx-auto mb-4 text-secondary" />
              <h1 className="text-3xl font-bold text-foreground mb-2">Quiz Finalizado!</h1>
              <p className={`text-2xl font-semibold ${performance.color}`}>{performance.text}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-primary/10 p-6 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Pontuação</p>
                <p className="text-4xl font-bold text-primary">{score}/{total}</p>
              </div>
              <div className="bg-accent/10 p-6 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Percentual</p>
                <p className="text-4xl font-bold text-accent">{percentage}%</p>
              </div>
              <div className="bg-secondary/10 p-6 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Acertos</p>
                <p className="text-4xl font-bold text-secondary">{score}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 justify-center md:flex-row">
              <Button className="w-full"
                onClick={() => navigate("/quiz-config")} variant="outline" size="lg">
                <Settings className="mr-2 w-5 h-5" />
                Opções do Quiz
              </Button>
              <Button className="w-full"
                onClick={() => navigate(-1)} size="lg">
                <RotateCcw className="mr-2 w-5 h-5" />
                Refazer Quiz
              </Button>
            </div>
          </Card>

          <Card className="p-8 shadow-lg border-2">
            <h2 className="text-2xl font-bold text-foreground mb-6">Revisão de Respostas</h2>
            <div className="space-y-6">
              {questions?.map((question: any, index: number) => {
                const isCorrect = question?.options[answers[index]]?.id_question_options === question?.correct_question_id;
                const correctAnswer = question?.options?.find((opt) =>
                  opt.id_question_options === question.correct_question_id
                );

                return (
                  <div key={question.id_question} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-start gap-3 mb-3">
                      {isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-foreground mb-2">
                          {index + 1}. {question?.question}
                        </p>
                        <div className="space-y-2 ml-4">
                          <p className="text-sm">
                            <span className="font-medium text-muted-foreground">Sua resposta: </span>
                            <span className={isCorrect ? "text-success" : "text-destructive"}>
                              {question?.options[answers[index]]?.answer_option || "Não respondido."}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-sm">
                              <span className="font-medium text-muted-foreground">Resposta correta: </span>
                              <span className="text-success">
                                {correctAnswer?.answer_option}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};