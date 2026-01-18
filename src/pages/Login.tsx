import { Anchor } from "lucide-react";

import { LoginCard } from "@/components/LoginCard";

import { svg_image_bg } from "@/data/imageSvg";

export const Login = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-accent py-16 px-4 text-center relative overflow-hidden">
        <div className={`absolute inset-0 opacity-20 bg-[url('${svg_image_bg}')]`}></div>

        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary rounded-full mb-6 shadow-lg">
            <Anchor className="w-10 h-10 text-secondary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground leading-tight">
            Acesse sua Conta
          </h1>
          <p className="text-primary-foreground/80 text-lg mt-2">
            Entre na plataforma e continue sua preparação
          </p>
        </div>
      </section>

      {/* Login Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <LoginCard />
      </div>
    </div>
  );
}
