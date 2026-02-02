import { useState, useEffect, useCallback } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/use-debounce";

import { Single } from "@/components/ManagerQuestions/Single";
import { Multi } from "@/components/ManagerQuestions/Multi";

import {
    INewQuestion,
    IResQuestions,
    TDifficulty,
    TSubject,
    IReqQuestionsGet,
    IReqQuestionsPut
} from "@/types/questions";

import { QuestionService } from "@/services/Question/QuestionService";
import { set } from "date-fns";

export const ManagerQuestions = () => {
    const { toast } = useToast();

    const [newQuestion, setNewQuestion] = useState<INewQuestion>({
        question: "",
        text: "",
        options: ["", "", "", "", ""],
        correct_answer: 0,
        difficulty: "EASY",
        subject: "POR"
    });

    const [isSingleOrMulti, setIsSingleOrMulti] = useState<"single" | "multi">("single");

    const [updateQuestion, setUpdateQuestion] = useState<IReqQuestionsPut>({
        id_question: "",
        question: "",
        text: "",
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
            text: "",
            options: ["", "", "", "", ""],
            correct_answer: 0,
            difficulty: "EASY",
            subject: "POR"
        });

        setUpdateQuestion({
            id_question: "",
            question: "",
            text: "",
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

    const getAllQuestion = useCallback(() => {
        QuestionService.getAll(filter)
            .then((result) => {
                setQuestion(result);
            })
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

    const loadDataFromUpdate = (question: IResQuestions) => {
        setIfNewQuestion(question.id_question);
        setUpdateQuestion({
            id_question: question.id_question,
            text: question.text,
            question: question.question,
            options: question.options,
            correct_answer: question.correct_question_id,
            difficulty: question.difficulty,
            subject: question.subject
        });

        setNewQuestion({
            text: question.text,
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

                    <RadioGroup
                        className="flex pb-5 justify-between"
                        value={isSingleOrMulti}
                        onValueChange={(value) => setIsSingleOrMulti(value as 'single' | 'multi')}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="single" id="single" />
                            <Label htmlFor="single">Quentão Única</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="multi" id="multi" />
                            <Label htmlFor="multi">Multiquestões</Label>
                        </div>
                    </RadioGroup>

                    {
                        isSingleOrMulti === 'single' ? (
                            <Single
                                clearStates={clearStates}
                                getAllQuestion={getAllQuestion}
                                newQuestion={newQuestion}
                                setNewQuestion={setNewQuestion}
                                updateQuestion={updateQuestion}
                                setUpdateQuestion={setUpdateQuestion}
                                ifNewQuestion={ifNewQuestion}
                                setIfNewQuestion={setIfNewQuestion}
                            />
                        ) : (
                            <Multi />
                        )
                    }
                </Card>

                <Card className="p-8 shadow-lg">
                    {/* Filtro */}
                    <div className="flex flex-col gap-5">
                        <h2 id="new_question_card" className="text-2xl font-bold text-foreground mb-6 flex items-center">
                            <Filter className="mr-2 w-6 h-6 text-primary" />
                            Filtros
                        </h2>

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

                {questions.length ? (
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

                                    {question.text && (
                                        <p className="text-gray-600 italic">"{question?.text}"</p>
                                    )}

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
                                                setIsSingleOrMulti("single");
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
                ) : null}
            </div>
        </TabsContent>
    );
};