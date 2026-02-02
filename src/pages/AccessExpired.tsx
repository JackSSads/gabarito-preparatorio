import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, Home, LogOut, Phone } from "lucide-react";

export const AccessExpired = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Limpar token expirado
        localStorage.removeItem("token");
        localStorage.removeItem("id_user");
    }, []);

    const handleRedirectToSuport = () => {
        window.open("https://wa.me/5584994015772", "_blank");
    };

    const handleRedirectToHome = () => {
        navigate("/");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted">
            <div className="w-full max-w-md px-6 py-8">
                <div className="rounded-lg border border-border bg-card p-8 shadow-lg">
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-full bg-yellow-100 p-4">
                            <Clock className="h-8 w-8 text-yellow-600" />
                        </div>
                    </div>

                    <h1 className="mb-2 text-center text-2xl font-bold text-foreground">
                        Acesso Expirado
                    </h1>

                    <p className="mb-6 text-center text-muted-foreground">
                        Seu teste grátis expirou. Fale com nossos atendentes para continuar usando a plataforma.
                    </p>

                    <div className="space-y-3">
                        <Button
                            onClick={handleRedirectToSuport}
                            className="w-full bg-primary hover:bg-primary/90"
                            size="lg"
                        >
                            <Phone className="mr-2 h-5 w-5" />
                            Falar com o suporte
                        </Button>

                        <Button
                            onClick={handleRedirectToHome}
                            variant="outline"
                            className="w-full"
                            size="lg"
                        >   
                            <Home className="mr-2 h-5 w-5" />
                            Voltar à Home
                        </Button>
                    </div>

                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Sua segurança é importante para nós. A sessão expira automaticamente
                        por razões de segurança.
                    </p>
                </div>
            </div>
        </div>
    );
};
