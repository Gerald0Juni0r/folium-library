import { Search, BookOpen, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "./auth-provider";

interface User {
  id: string;
  nome: string;
  email: string;
}

interface HeaderBibliotecaProps {
  consulta: string;
  onMudancaConsulta: (query: string) => void;
  onSubmitBusca: () => void;
  usuario: User;
}

export function HeaderBiblioteca({
  consulta,
  onMudancaConsulta,
  onSubmitBusca,
  usuario,
}: HeaderBibliotecaProps) {
  const { logout } = useAuth();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSubmitBusca();
    }
  };

  const handleLogout = () => {
    logout();
  };

  const getInitials = (nome: string) => {
    return nome
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo e Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-folium-sage text-white">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-semibold text-folium-ink dark:text-folium-cream">
                Folium
              </h1>
              <p className="text-xs text-muted-foreground">
                Sua biblioteca pessoal
              </p>
            </div>
          </div>

          {/* Barra de Busca */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar livros por título ou autor..."
                value={consulta}
                onChange={(e) => onMudancaConsulta(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 pr-4 py-2 w-full bg-folium-cream dark:bg-folium-steel border-folium-silver dark:border-folium-silver/30 focus:border-folium-sage dark:focus:border-folium-azure transition-colors"
              />
            </div>
          </div>

          {/* Ações */}
          <div className="flex items-center space-x-2">
            <Button
              onClick={onSubmitBusca}
              className="bg-folium-sage hover:bg-folium-sage/90 text-white"
              disabled={!consulta.trim()}
            >
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
            <ThemeToggle />

            {/* Menu do Usuário */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-folium-sage text-white">
                      {getInitials(usuario.nome)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {usuario.nome}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {usuario.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 dark:text-red-400"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
