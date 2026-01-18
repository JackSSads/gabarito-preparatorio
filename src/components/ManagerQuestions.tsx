import { useState, useEffect, useCallback } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/use-debounce";

import {
    INewQuestion,
    IResQuestions,
    TDifficulty,
    TSubject,
    IReqQuestionsGet,
    IReqQuestionsPut
} from "@/types/questions";

import { QuestionService } from "@/services/Question/QuestionService";

export const ManagerQuestions = () => {
    const { toast } = useToast();

    const [newQuestion, setNewQuestion] = useState<INewQuestion>({
        question: "",
        options: ["", "", "", "", ""],
        correct_answer: 0,
        difficulty: "EASY",
        subject: "POR"
    });

    const [updateQuestion, setUpdateQuestion] = useState<IReqQuestionsPut>({
        id_question: "",
        question: "",
        options: [
            { id_question_options: "", answer_option: "" },
            { id_question_options: "", answer_option: "" },
            { id_question_options: "", answer_option: "" },
            { id_question_options: "", answer_option: "" },
        ],
        correct_answer: "",
        difficulty: "EASY",
        subject: "0"
    });

    const [questions, setQuestion] = useState<IResQuestions[]>([]);

    const [ifNewQuestion, setIfNewQuestion] = useState<string | null>(null);

    const [filter, setFilter] = useState<IReqQuestionsGet>({
        keyword: "",
        difficulty: "0",
        subject: "0",
        limit: 10,
        offset: 0,
    });

    const { debounce } = useDebounce(1500);

    useEffect(() => {
        debounce(() => {
            getAllQuestion();
        });
    }, [filter]);

    const clearStates = () => {
        setNewQuestion({
            question: "",
            options: ["", "", "", "", ""],
            correct_answer: 0,
            difficulty: "EASY",
            subject: "POR"
        });

        setUpdateQuestion({
            id_question: "",
            question: "",
            options: [
                { id_question_options: "", answer_option: "" },
                { id_question_options: "", answer_option: "" },
                { id_question_options: "", answer_option: "" },
                { id_question_options: "", answer_option: "" },
            ],
            correct_answer: "",
            difficulty: "EASY",
            subject: "0"
        });

    };

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
                    description: error.message
                });
            });
    };

    const getAllQuestion = useCallback(() => {
        QuestionService.getAll(filter)
            .then(setQuestion)
            .catch((error) => {
                toast({
                    title: "Erro",
                    description: error.message
                });
            });
    }, [filter]);

    const deleteQuestion = (id_question: string) => {
        QuestionService.delete_by_id(id_question)
            .then((result) => {
                toast({
                    title: "Questão excluída",
                    description: result.message
                });

                getAllQuestion();
            })
            .catch((error) => {
                toast({
                    title: "Erro",
                    description: error.message
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
                    description: error.message
                });
            });
    }, [newQuestion]);

    const loadDataFromUpdate = (question: IResQuestions) => {
        setIfNewQuestion(null);
        setUpdateQuestion({
            id_question: question.id_question,
            question: question.question,
            options: question.options,
            correct_answer: question.correct_question_id,
            difficulty: question.difficulty,
            subject: question.subject
        });

        setNewQuestion({
            question: question.question,
            options: question.options.map((opt) => opt.answer_option),
            correct_answer: question.options.findIndex(opt =>
                opt.id_question_options === question.correct_question_id
            ),
            difficulty: question.difficulty,
            subject: question.subject
        });

        document.getElementById("new_question_card")?.scrollIntoView({
            behavior: "smooth"
        });
    };

    return (
        <TabsContent value="questions">
            <div className="flex flex-col gap-12">
                <Card className="p-8 shadow-lg">
                    <h2 id="new_question_card" className="text-2xl font-bold text-foreground mb-6 flex items-center">
                        <Plus className="mr-2 w-6 h-6 text-primary" />
                        Nova Questão
                    </h2>

                    {/* Cadastro */}
                    <div className="space-y-6">
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
                                    : upQuestion(ifNewQuestion as string)
                            }
                            className="w-full"
                            size="lg">
                            <Plus className="mr-2 w-5 h-5" />
                            {!ifNewQuestion ? "Adicionar Questão" : "Atualizar Questão"}
                        </Button>
                    </div>
                </Card>

                <Card className="p-8 shadow-lg">
                    {/* Filtro */}
                    <div className="flex flex-col gap-5">
                        <h3 className="text-xl font-bold text-foreground mb-4">Filtros</h3>

                        <div>
                            <Label htmlFor="difficulty">Nível de Dificuldade</Label>
                            <Select
                                value={filter.difficulty}
                                onValueChange={(e) =>
                                    setFilter((prev) => ({
                                        ...prev,
                                        difficulty: e as TDifficulty
                                    }))
                                }
                            >
                                <SelectTrigger className="mt-2">
                                    <SelectValue placeholder="Selecione o nível da questão" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">Todos</SelectItem>
                                    <SelectItem value="EASY">Fácil</SelectItem>
                                    <SelectItem value="MEDIUM">Médio</SelectItem>
                                    <SelectItem value="HARD">Avançado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="subject">Tema</Label>
                            <Select
                                value={filter.subject}
                                onValueChange={(e) =>
                                    setFilter((prev) => ({
                                        ...prev,
                                        subject: e as TSubject
                                    }))
                                }
                            >
                                <SelectTrigger className="mt-2">
                                    <SelectValue placeholder="Selecione o tema" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">Todos</SelectItem>
                                    <SelectItem value="POR">Português</SelectItem>
                                    <SelectItem value="MAT">Matemática</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-4">
                            <Label>Palavras-chave</Label>
                            <Input
                                placeholder="Texto da pergunta..."
                                value={filter.keyword}
                                onChange={(e) =>
                                    setFilter((prev) => ({
                                        ...prev,
                                        keyword: e.target.value
                                    }))}
                            />
                        </div>
                    </div>
                </Card>

                <Card className="p-8 shadow-lg">
                    {/* Questões */}
                    <div className="flex flex-col gap-5">
                        <h3 className="text-xl font-bold text-foreground mb-4">Questões Cadastradas</h3>
                        {questions?.map((question: IResQuestions) => (
                            <Card className="relative p-8 shadow-lg flex flex-col gap-3" key={question.id_question}>
                                <p className={
                                    `   
                                ${question.difficulty === "EASY" ? "bg-blue-500"
                                        : question.difficulty === "MEDIUM" ? "bg-yellow-500"
                                            : "bg-red-500"
                                    }
                                    rounded-md p-1 text-white text-center font-semibold`}>
                                    {
                                        question.subject === "POR" ? "Português"
                                            : question.subject === "MAT" ? "Matemática"
                                                : ""
                                    }
                                </p>

                                <p className="font-semibold text-gray-700">{question.question}</p>

                                <div className="flex flex-col">
                                    <ul>
                                        {question.options?.map((option, index) => (
                                            <p key={index}>{`${index + 1}`}) {option?.answer_option}</p>
                                        ))}
                                    </ul>
                                </div>

                                <p className="font-semibold ">
                                    Resposta correta: <span className="text-blue-600">{
                                        question.options?.find(
                                            (item) => item.id_question_options === question.correct_question_id
                                        )?.answer_option
                                    }</span>
                                </p>

                                <div className="border-t-2 pt-5 flex justify-center gap-10">
                                    <Button
                                        className="w-full bg-blue-500 hover:bg-blue-600"
                                        onClick={() => {
                                            loadDataFromUpdate(question);
                                            setIfNewQuestion(question.id_question);
                                        }}
                                    >
                                        <Edit /> Editar
                                    </Button>
                                    <Button
                                        className="w-full bg-orange-500 hover:bg-orange-600"
                                        onClick={() => deleteQuestion(question.id_question)}
                                    >
                                        <Trash />Excluir
                                    </Button>
                                </div>
                            </Card>
                        )) || (
                                <p className="text-muted-foreground text-center py-8">
                                    Nenhuma questão cadastrada ainda. Adicione a primeira questão acima!
                                </p>
                            )}
                    </div>
                </Card>
            </div>
        </TabsContent>
    );
};