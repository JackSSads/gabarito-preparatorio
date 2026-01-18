import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Anchor, Trophy, Settings, Home } from "lucide-react";

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const links = [
    { to: "/", label: "Início", icon: <Home className="w-4 h-4 mr-2" /> },
    { to: "/ranking", label: "Ranking", icon: <Trophy className="w-4 h-4 mr-2" /> },
  ];

  return (
    <nav className="border-b border-border shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-lg group-hover:scale-110 transition-transform">
              <Anchor className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">
              Quiz Gabarito
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {links.map((link) => (
              <Button
                key={link.to}
                variant={isActive(link.to) ? "default" : "ghost"}
                size="sm"
                asChild
              >
                <Link to={link.to}>
                  {link.icon}
                  {link.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
