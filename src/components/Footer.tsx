import { Anchor } from "lucide-react";
export const Footer = () => {
    return (
        <footer className="bg-card border-t border-border py-8 px-4">
            <div className="container mx-auto max-w-6xl text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Anchor className="w-6 h-6 text-primary" />
                    <span className="font-bold text-lg text-foreground">Quiz Gabarito Preparatório</span>
                </div>
                <p className="text-sm text-muted-foreground">
                    © 2025 Quiz Gabarito. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
};