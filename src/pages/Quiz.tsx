import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { QuestionService } from "@/services/Question/QuestionService";
import { QuestionAnswerService } from "@/services/QuestionAnswer/QuestionAnswerService";

import { IResQuestions, TSubject, TDifficulty, IResOptions } from "@/types/questions";
import { IReqQuestionAnswer } from "@/types/questionAnswer";

export const Quiz = () => {
  const navigate = useNavigate();
  const [search_params] = useSearchParams();
  const { toast } = useToast();

  const time: string = search_params.get("time") ?? "180";
  const limit: string = search_params.get("limit") ?? "40";
  const difficulty: TDifficulty = search_params.get("difficulty") as TDifficulty ?? "0";
  const subject: TSubject = search_params.get("subject") as TSubject ?? "0";

  const [current_question, set_current_question] = useState<number>(0);
  const [selected_answer, set_selected_answer] = useState<number | null>(null);
  const [score, set_score] = useState<number>(0);
  const [time_left, set_time_left] = useState<number>(Number(time)); // 3 minutes in seconds
  const [response_time, set_response_time] = useState<number>(0);
  const [questions, set_questions] = useState<IResQuestions[]>();
  const [answers, set_answers] = useState<number[]>([]);

  const getQuestions = useCallback(() => {
    QuestionService.getAll({
      subject: subject,
      difficulty: difficulty,
      random: "1",
      limit: Number(limit),
      offset: 0
    })
      .then(set_questions)
      .catch((error) => {
        toast({
          title: "Eita...",
          description: error.message
        });
      });
  }, []);

  const insertQuestionAnswer = useCallback(({
    id_question, id_user, is_correct, is_timeout, response_time, selected_option_id
  }: IReqQuestionAnswer) => {

    QuestionAnswerService.inser_question_answer({
      id_question: id_question,
      id_user: id_user,
      is_correct: is_correct,
      is_timeout: is_timeout,
      response_time: response_time,
      selected_option_id: selected_option_id
    })
      .catch((error) => {
        toast({
          title: "Eita...",
          description: error.message
        });
      });
  }, [response_time]);

  useEffect(() => { getQuestions() }, []);

  useEffect(() => {
    if (time_left <= 0) {
      handleNext(true);
      return;
    };

    /* console.log("Text", questions[36]) */
    
    const timer = questions?.length ? setTimeout(() => {
      set_time_left((prev) => prev - 1);
      set_response_time((prev) => prev + 1);
    }, 1000) : null;

    return () => clearTimeout(timer);
  }, [time_left, questions]);

  const handleNext = (isTimeout = false) => {
    const question = questions[current_question];

    const newAnswers: Array<number> = [...answers, selected_answer];
    set_answers(newAnswers);

    const selected_option_id = !isTimeout && selected_answer !== null
      ? question.options[selected_answer]?.id_question_options ?? null
      : null;

    const isCorrect = !isTimeout &&
      selected_option_id === question.correct_question_id;

    if (isCorrect) set_score(prev => prev + 1);

    const id_user = localStorage.getItem("id_user");

    insertQuestionAnswer({
      id_question: question.id_question,
      id_user: id_user,
      is_correct: isCorrect,
      response_time: response_time,
      is_timeout: time_left === 0,
      selected_option_id: selected_option_id
    });

    set_selected_answer(null);
    set_time_left(Number(time));
    set_response_time(0);

    if (current_question < questions.length - 1) {
      set_current_question(current_question + 1);
    } else {
      localStorage.setItem("score", String(isCorrect ? score + 1 : score))
      navigate("/results", {
        state: {
          score: isCorrect ? score + 1 : score,
          total: questions.length,
          answers: newAnswers,
          questions: questions
        }
      });
    };
  };

  const progress = ((current_question + 1) / questions?.length) * 100;
  const minutes = Math.floor(time_left / 60);
  const seconds = time_left % 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">Quiz Preparatório</h1>
              <p className="text-sm text-muted-foreground">
                Questão {current_question + 1} de {questions?.length}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg shadow-sm">
              <Clock className="w-5 h-5 text-primary" />
              <span className={`font-mono text-lg font-bold ${time_left <= 30 ? 'text-destructive' : 'text-foreground'}`}>
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          <Progress value={progress} className="mb-8 h-2" />

          <Card className="p-8 shadow-lg border-2">
            {questions?.length ? (
              <>
                <div className="mb-6">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${questions?.[current_question].difficulty === 'EASY'
                    ? 'bg-success/10 text-success'
                    : questions?.[current_question].difficulty === 'MEDIUM'
                      ? 'bg-warning/10 text-warning'
                      : 'bg-destructive/10 text-destructive'
                    }`}>
                    {questions?.[current_question].difficulty === 'EASY' ? 'Fácil' :
                      questions?.[current_question].difficulty === 'MEDIUM' ? 'Médio' : 'Avançado'}
                  </span>

                {questions?.[current_question].text && (
                  <p className="mb-4 italic">
                    "{questions?.[current_question].text}"
                  </p>
                )}

                  <h2 className="text-xl font-semibold text-foreground leading-relaxed">
                    {questions?.[current_question].question}
                  </h2>
                </div>

                <RadioGroup value={selected_answer?.toString()} onValueChange={(value) => set_selected_answer(parseInt(value))}>
                  <div className="space-y-3">
                    {questions?.[current_question].options?.map((option: IResOptions, index) => (
                      <div
                        key={index}
                        className={`
                          flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-primary/50 hover:bg-primary/5
                          ${selected_answer === index ? 'border-primary bg-primary/10' : 'border-border'}
                          `}
                        onClick={() => set_selected_answer(index)}
                      >
                        <RadioGroupItem value={index.toString()} id={`option-`} />
                        <Label
                          htmlFor={`option-${index}`}
                          className="flex-1 cursor-pointer text-base"
                        >
                          {option.answer_option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                <Button
                  onClick={() => handleNext(false)}
                  disabled={selected_answer === null && time_left < 0}
                  className="w-full mt-8 h-12 text-base font-semibold"
                  size="lg"
                >
                  {current_question < questions?.length - 1 ? (
                    "Próxima Questão"
                  ) : (
                    "Finalizar Quiz"
                  )}
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </>
            ) : (
              <div className="h-14 flex justify-center items-center">
                <p className="text-center font-semibold">
                  Carregando pergunta...
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};