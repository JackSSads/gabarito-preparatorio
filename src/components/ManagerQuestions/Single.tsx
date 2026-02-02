import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

import {
    INewQuestion,
    TDifficulty,
    TSubject,
    IReqQuestionsPut,
    IResQuestions
} from "@/types/questions";

import { QuestionService } from "@/services/Question/QuestionService";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface SingleProps {
    clearStates: () => void;
    getAllQuestion: () => void;
    newQuestion: INewQuestion;
    setNewQuestion: (question: INewQuestion) => void;
    updateQuestion: IReqQuestionsPut;
    setUpdateQuestion: (question: IReqQuestionsPut) => void;
    ifNewQuestion: string | null;
    setIfNewQuestion: (id: string | null) => void;
}

export const Single: React.FC<SingleProps> = ({
    clearStates,
    getAllQuestion,
    newQuestion,
    setNewQuestion,
    updateQuestion,
    setUpdateQuestion,
    ifNewQuestion,
    setIfNewQuestion
}) => {
    const { toast } = useToast();

    const createQuestion = () => {
        if (!newQuestion.question || newQuestion.options.some(opt => !opt)) {
            toast({
                title: "Erro",
                description: "Preencha todos os campos da questão",
                variant: "destructive"
            });
            return;
        };

        QuestionService.insert({
            question: newQuestion.question,
            options: newQuestion.options,
            correct_answer: newQuestion.correct_answer,
            difficulty: newQuestion.difficulty,
            subject: newQuestion.subject
        })
            .then((result) => {
                toast({
                    title: "Questão cadastrada",
                    description: result.message
                });
                clearStates();
            })
            .catch((error) => {
                toast({
                    title: "Erro",
                    description: error.message,
                    variant: "destructive"
                });
            });
    };

    const upQuestion = useCallback((ifNewQuestion: string) => {

        const op = updateQuestion.options.map((op, index) => ({
            id_question_options: op.id_question_options,
            answer_option: newQuestion.options[index]
        }));

        const payload = {
            question: newQuestion.question,
            text: newQuestion.text,
            options: op,
            correct_answer: op[newQuestion.correct_answer].id_question_options,
            difficulty: newQuestion.difficulty,
            subject: newQuestion.subject
        };

        QuestionService.updateQuestion({ id_question: ifNewQuestion, ...payload })
            .then((result) => {
                toast({
                    title: "Questão atualizada",
                    description: result.message
                });

                clearStates();
                setIfNewQuestion(null);
                getAllQuestion();
            })
            .catch((error) => {
                toast({
                    title: "Erro",
                    description: error.message,
                    variant: "destructive"
                });
            });
    }, [newQuestion]);



    return (
        < div className="space-y-6" >
            <div>
                <Label htmlFor="question">Pergunta</Label>
                <Textarea
                    id="question"
                    placeholder="Digite a questão..."
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                    className="mt-2 min-h-[100px]"
                />
            </div>

            {/* Texto Auxiliar */}
            <div>
                <Label htmlFor="text">Texto Auxiliar (opcional)</Label>
                <Textarea
                    id="text"
                    placeholder="Digite o texto auxiliar..."
                    value={newQuestion.text}
                    onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                    className="mt-2 min-h-[100px]"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="difficulty">Nível de Dificuldade</Label>
                    <Select
                        value={newQuestion.difficulty}
                        onValueChange={(value) => setNewQuestion({ ...newQuestion, difficulty: value as TDifficulty })}
                    >
                        <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Selecione o nível da questão" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="EASY">Fácil</SelectItem>
                            <SelectItem value="MEDIUM">Médio</SelectItem>
                            <SelectItem value="HARD">Avançado</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="subject">Tema</Label>
                    <Select
                        value={newQuestion.subject}
                        onValueChange={(value) => setNewQuestion({ ...newQuestion, subject: value as TSubject })}
                    >
                        <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Selecione o tema" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="POR">Português</SelectItem>
                            <SelectItem value="MAT">Matemática</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="correct">Resposta Correta</Label>
                    <Select
                        value={newQuestion.correct_answer.toString()}
                        onValueChange={(value) => setNewQuestion({ ...newQuestion, correct_answer: parseInt(value) })}
                    >
                        <SelectTrigger className="mt-2">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {newQuestion.options.map((_, index) => (
                                <SelectItem key={index} value={index.toString()}>
                                    Alternativa {index + 1}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-4">
                <Label>Alternativas (5 opções)</Label>
                {newQuestion.options.map((option, index) => (
                    <div key={index}>
                        <Input
                            placeholder={`Alternativa ${index + 1}`}
                            value={option}
                            onChange={(e) => {
                                const newOptions = [...newQuestion.options];
                                newOptions[index] = e.target.value;
                                setNewQuestion({ ...newQuestion, options: newOptions });
                            }}
                        />
                    </div>
                ))}
            </div>

            <Button
                onClick={() =>
                    ifNewQuestion === null
                        ? createQuestion()
                        : upQuestion(ifNewQuestion)
                }
                className="w-full"
                size="lg">
                <Plus className="mr-2 w-5 h-5" />
                {!ifNewQuestion ? "Adicionar Questão" : "Atualizar Questão"}
            </Button>
        </div >
    );
}