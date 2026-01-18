import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Users } from "lucide-react";
import { ManagerQuestions } from "@/components/ManagerQuestions";
import { ManagerUser } from "@/components/ManagerUser";

export const Admin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Painel Administrativo</h1>
              <p className="text-muted-foreground">Gerenciar questões e usuários</p>
            </div>
          </div>

          <Tabs defaultValue="questions" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="questions" className="text-base">
                <Edit className="mr-2 w-5 h-5" />
                Questões
              </TabsTrigger>
              <TabsTrigger value="users" className="text-base">
                <Users className="mr-2 w-5 h-5" />
                Usuários
              </TabsTrigger>
            </TabsList>

            <ManagerQuestions />

            <ManagerUser />
          </Tabs>
        </div>
      </div>
    </div>
  );
};