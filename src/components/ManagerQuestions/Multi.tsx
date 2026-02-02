import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import { QuestionService } from "@/services/Question/QuestionService";

const placeholder = `
Insira a lista de questões no formato .json
Ex.:
[
    {
        "text":"Texto base da questão",
        "question":"Enunciado da questão",
        "options":["A","B","C","D"],
        "correct_answer":0, (índice da opção correta = A)
        "difficulty":"EASY | MEDIUM | HARD",
        "subject":"POR | MAT"
    },
    {
        "text":"Texto base da questão",
        "question":"Enunciado da questão",
        "options":["2","4","6","8"],
        "correct_answer":2, (índice da opção correta = 6)
        "difficulty":"EASY | MEDIUM | HARD",
        "subject":"POR | MAT"
    },
]
`;

export const Multi = () => {

    const { toast } = useToast();

    const [questionText, setQuestionText] = useState<string>("");

    const createQuestion = () => {
        if (!questionText) {
            toast({
                title: "Erro",
                description: "Preencha o campo das questões",
                variant: "destructive"
            });
            return;
        };

        QuestionService.insertMulti({
            text: questionText
        })
            .then(() => {
                toast({
                    title: "Sucesso",
                    description: "Questões cadastradas com sucesso",
                    variant: "default"
                });
                setQuestionText("");
            }).catch((error) => {
                toast({
                    title: "Erro",
                    description: error.message,
                    variant: "destructive"
                });
            });
    };

    return (
        <div>
            <Label htmlFor="question">Pergunta</Label>
            <Textarea
                id="question"
                placeholder={placeholder}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="mt-2 min-h-[100px] h-[450px]"
            />
            <Button className="mt-4 w-full" onClick={createQuestion}>Cadastrar Questões</Button>
        </div>
    );
};