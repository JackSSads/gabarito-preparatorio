import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Trophy,
  Target,
  Clock,
  Award,
  Anchor,
  ChevronRight
} from "lucide-react";

import { svg_image_bg } from "@/data/imageSvg"

export const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Questões Autênticas",
      description: "Perguntas baseadas em provas reais da Marinha Mercante"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Tempo Controlado",
      description: "Treine com cronômetro para simular condições reais"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Níveis de Dificuldade",
      description: "Do básico ao avançado, escolha seu desafio"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Ranking Competitivo",
      description: "Compare seu desempenho com outros alunos"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent py-20 px-4">
        <div className={`absolute inset-0 bg-[url('${svg_image_bg}')] opacity-20`}></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary rounded-full mb-6 shadow-lg">
              <Anchor className="w-10 h-10 text-secondary-foreground" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Quiz Gabarito Preparatório
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Prepare-se para as provas da Marinha Mercante com simulados interativos e avaliações precisas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/login")}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Começar Quiz Agora
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/ranking")}
                className="bg-primary-foreground/10 text-primary-foreground border-2 border-primary-foreground/30 hover:bg-primary-foreground/20 h-14 px-8 text-lg font-semibold backdrop-blur-sm"
              >
                <Trophy className="mr-2 w-5 h-5" />
                Ver Ranking
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Por que escolher o Quiz Gabarito?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Uma plataforma completa para sua preparação profissional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 border-2 hover:border-primary/30"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary">
        <div className="container mx-auto max-w-4xl text-center">
          <Award className="w-16 h-16 mx-auto mb-6 text-secondary" />
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Junte-se a centenas de alunos que já estão se preparando para o sucesso
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/register")}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 px-8 text-lg font-semibold shadow-lg"
          >
            Iniciar Meu Primeiro Quiz
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};