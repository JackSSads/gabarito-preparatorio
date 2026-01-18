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
import { LoginService } from "@/services/LoginService/LoginService";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(5, "Senha inválida"),
});

export const LoginCard = () => {

  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data) {
    LoginService.login(data.email, data.password)
      .then((result) => {
        toast({
          title: `Bem-vindo(a) ${result.name}`,
          description: result.message,
        });

        if (result.role === "ADMIN") {
          navigate("/admin");
          return;
        };

        navigate("/quiz-config");
      })
      .catch((error) => {
        toast({
          title: "Hum... Confere o login aí.",
          description: error.message,
        });
      });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-2 shadow-lg">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-foreground">
            Login
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

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

              <Button
                type="submit"
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                Entrar
              </Button>

            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
