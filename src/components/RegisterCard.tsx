import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";

import { LogIn } from "lucide-react";
import { AuthService } from "@/services/AuthService/AuthService";

import { IRegister } from "@/types/auth";

const loginSchema = z.object({
    name: z.string().min(10, "Esse campo deve conter no mínimo 10 caracteres."),
    email: z.string().email("E-mail inválido."),
    phone: z.string().length(11, "Digite o número de telefone sem espaço, parênteses ou travessão. EX.: 00123456789."),
    password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres."),
    conf_password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres.")
});

export const RegisterCard = () => {

    const navigate = useNavigate();
    const { toast } = useToast();

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            conf_password: "",
        },
    });

    function onSubmit({ name, email, password, conf_password, phone }: IRegister) {

        if (!name || !email || !password || !conf_password || !phone) {
            console.log({ name, email, password, conf_password, phone })
            toast({
                title: "Falta alguma coisinha aí, ehm...",
                description: "Preencha todos os campos corretamente",
            });
            return;
        };

        if (password !== conf_password) {
            toast({
                title: "Rapaz...",
                description: "As senhas não coincidem.",
            });
            return;
        };

        AuthService.register({
            name: name,
            email: email,
            password: password,
            phone: phone
        })
            .then((result) => {
                toast({
                    title: `Bem-vindo(a) ${result.name}`,
                    description: result.message,
                });

                navigate("/login");
            })
            .catch((error) => {
                toast({
                    title: "Hum... Confere o teu registro aí.",
                    description: error.message,
                });
            });
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <Card className="border-2 shadow-lg">
                <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-center mb-6 text-foreground">
                        Cadastre-se
                    </h2>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                            {/* Nome */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Fulano de tal"
                                                className="h-12 text-base"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-mail</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="seuemail@exemplo.com"
                                                className="h-12 text-base"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Telefone */}
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Telefone</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="00123456789"
                                                className="h-12 text-base"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Senha */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Senha"
                                                className="h-12 text-base"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Confirmar Senha */}
                            <FormField
                                control={form.control}
                                name="conf_password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirme sua senha</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Confirme sua senha"
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
                                <LogIn className="w-5 h-5" />
                                Entrar
                            </Button>

                        </form>
                    </Form>
                    <div className="flex justify-center mt-4">
                        <p>Já possui uma conta? <span
                            onClick={() => navigate("/login")}
                            className="text-blue-700 underline cursor-pointer"
                        >
                            Acessar minha conta
                        </span>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
