import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { Trophy, Medal, Award, Home } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { RankingService } from "@/services/Ranking/RankingService";

import { IReqRanking } from "@/types/ranking";

export const Ranking = () => {
  const { toast } = useToast();
  const [ranking, set_ranking] = useState<IReqRanking[]>([]);

  useEffect(() => {
    RankingService.get_ranking()
      .then((result) => {
        set_ranking(result);
      })
      .catch((error) => {
        toast({
          title: "Eita...",
          description: error.message
        });
      });
  }, []);

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-8 h-8 text-secondary" />;
      case 2:
        return <Medal className="w-8 h-8 text-muted-foreground" />;
      case 3:
        return <Award className="w-8 h-8 text-warning" />;
      default:
        return <span className="text-2xl font-bold text-muted-foreground">{position}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Ranking Geral</h1>
              <p className="text-muted-foreground">Classificação dos melhores alunos</p>
            </div>
          </div>

          <div className="grid gap-4">
            {!ranking.length ? ranking.map((entry) => (
              <Card
                key={entry.position}
                className={`p-6 shadow-md transition-all hover:shadow-lg ${entry.position <= 3 ? 'border-2 border-primary/30 bg-gradient-to-r from-primary/5 to-transparent' : ''
                  }`}
              >
                <div className="flex items-center gap-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted">
                    {getMedalIcon(entry.position)}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-1">{entry.name}</h3>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                      <span>Perguntas respondidas: {entry.quizzes_taken}</span>
                      <span>Média: {entry.average_score}%</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Pontuação Total</p>
                    <p className="text-3xl font-bold text-primary">{entry.score}</p>
                  </div>
                </div>
              </Card>
            )) : (
              <div className="flex flex-col gap-5 animate-pulse">
                <Card className={"p-6 shadow-md transition-all hover:shadow-lg"} >
                  <div className="flex items-center gap-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted"></div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-1"></h3>
                      <div className="flex gap-2">
                        <div className="bg-gray-100 rounded-md h-10 w-full"></div>
                        <div className="bg-gray-100 rounded-md h-10 w-full"></div>
                        <div className="bg-gray-100 rounded-md h-10 w-full"></div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className={"p-6 shadow-md transition-all hover:shadow-lg"} >
                  <div className="flex items-center gap-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted"></div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-1"></h3>
                      <div className="flex gap-2">
                        <div className="bg-gray-100 rounded-md h-10 w-full"></div>
                        <div className="bg-gray-100 rounded-md h-10 w-full"></div>
                        <div className="bg-gray-100 rounded-md h-10 w-full"></div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className={"p-6 shadow-md transition-all hover:shadow-lg"} >
                  <div className="flex items-center gap-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted"></div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-1"></h3>
                      <div className="flex gap-2">
                        <div className="bg-gray-100 rounded-md h-10 w-full"></div>
                        <div className="bg-gray-100 rounded-md h-10 w-full"></div>
                        <div className="bg-gray-100 rounded-md h-10 w-full"></div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};