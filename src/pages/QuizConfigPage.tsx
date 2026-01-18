import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import { Target, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

import { IFormQuizConfig } from "@/types/quizConfig";

const configSchema = z.object({
  time: z.string(),
  difficulty: z.string(),
  subject: z.string(),
  limit: z.string()
});

export const QuizConfigPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(configSchema),
    defaultValues: {
      time: "180",      // default 3 min
      difficulty: "0",  // Aleatoria, EASY, MEDIUM ou HARD
      subject: "0",     // Aleatórias, POR ou MAT
      limit: "40",      // quantidade de questões
    },
  });

  function onSubmit({
    time, difficulty, limit, subject,
  }: IFormQuizConfig) {
    if (!time || !difficulty || !subject || !limit) {

      let missing = [];
      !time && missing.push("tempo");
      !difficulty && missing.push("dificuldade");
      !subject && missing.push("assunto");
      !limit && missing.push("quantidade de questões");

      toast({
        title: "Escolhe tuas opções para as questões...",
        description: `Tá faltando: ${missing.join(", ")}`,
      });
    };

    navigate(`/quiz?time=${time}&subject=${subject}&difficulty=${difficulty}&limit=${limit}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-accent py-16 px-4 text-center relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary rounded-full mb-6 shadow-lg">
            <Settings className="w-10 h-10 text-secondary-foreground" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground">
            Configurações do Quiz
          </h1>

          <p className="text-primary-foreground/80 mt-2 text-lg">
            Ajuste as preferências antes de começar
          </p>
        </div>
      </section>

      {/* Form Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-lg border-2 shadow-lg">
          <CardContent className="p-8">

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* Tempo */}
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tempo por questão</FormLabel>

                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="h-12 text-base">
                            <SelectValue placeholder="Selecione o tempo" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(10)].map((_, i) => (
                              <SelectItem key={i} value={String((i + 1) * 60)}>
                                {i + 1} minuto{i > 0 && "s"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Dificuldade */}
                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nível de dificuldade</FormLabel>

                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="h-12 text-base">
                            <SelectValue placeholder="Selecione a dificuldade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Aleatório</SelectItem>
                            <SelectItem value="EASY">Fácil</SelectItem>
                            <SelectItem value="MEDIUM">Médio</SelectItem>
                            <SelectItem value="HARD">Difícil</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Matéria */}
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Matéria</FormLabel>

                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="h-12 text-base">
                            <SelectValue placeholder="Selecione a matéria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Aleatório</SelectItem>
                            <SelectItem value="POR">Português</SelectItem>
                            <SelectItem value="MAT">Matemática</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Quantidade de questões */}
                <FormField
                  control={form.control}
                  name="limit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade de questões</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Quantidade"
                          className="h-12 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold flex items-center justify-center gap-2"
                >
                  <Target className="w-5 h-5" />
                  Iniciar Quiz
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
