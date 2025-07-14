import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, BookOpen, User, LogOut, Menu, X } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "./auth-provider";

interface User {
  id: string;
  nome: string;
  email: string;
  foto?: string;
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
  const navigate = useNavigate();
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);

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
        {/* Layout Desktop */}
        <div className="hidden lg:flex items-center justify-between">
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

          {/* Ações Desktop */}
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

            {/* Menu do Usuário Desktop */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    {usuario.foto ? (
                      usuario.foto.startsWith("data:") ||
                      usuario.foto.startsWith("http") ? (
                        <AvatarImage src={usuario.foto} alt="Foto do perfil" />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full text-xl bg-folium-sage/10">
                          {usuario.foto}
                        </div>
                      )
                    ) : (
                      <AvatarFallback className="bg-folium-sage text-white">
                        {getInitials(usuario.nome)}
                      </AvatarFallback>
                    )}
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
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate("/perfil")}
                >
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

        {/* Layout Mobile */}
        <div className="lg:hidden">
          {/* Header Mobile Superior */}
          <div className="flex items-center justify-between mb-4">
            {/* Logo Mobile */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-folium-sage text-white">
                <BookOpen className="h-4 w-4" />
              </div>
              <h1 className="text-xl font-serif font-semibold text-folium-ink dark:text-folium-cream">
                Folium
              </h1>
            </div>

            {/* Ações Mobile */}
            <div className="flex items-center space-x-2">
              <ThemeToggle />

              {/* Menu Sanduíche */}
              <Sheet open={menuMobileAberto} onOpenChange={setMenuMobileAberto}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-80 bg-folium-cream dark:bg-folium-steel border-folium-silver dark:border-folium-silver/30 h-full max-h-screen overflow-hidden"
                >
                  <div className="flex flex-col h-full min-h-0">
                    {/* Header do Menu */}
                    <div className="pb-4 border-b border-folium-silver dark:border-folium-silver/30">
                      <h2 className="text-lg font-serif font-semibold text-folium-ink dark:text-folium-cream">
                        Menu
                      </h2>
                    </div>

                    {/* Perfil do Usuário */}
                    <div className="py-6 border-b border-folium-silver dark:border-folium-silver/30">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          {usuario.foto ? (
                            usuario.foto.startsWith("data:") ||
                            usuario.foto.startsWith("http") ? (
                              <AvatarImage
                                src={usuario.foto}
                                alt="Foto do perfil"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full w-full text-2xl bg-folium-sage/10">
                                {usuario.foto}
                              </div>
                            )
                          ) : (
                            <AvatarFallback className="bg-folium-sage text-white text-lg">
                              {getInitials(usuario.nome)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <p className="font-medium text-folium-ink dark:text-folium-cream">
                            {usuario.nome}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {usuario.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="flex-1 py-6">
                      <nav className="space-y-2">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left hover:bg-folium-parchment dark:hover:bg-folium-silver/20"
                          onClick={() => {
                            navigate("/perfil");
                            setMenuMobileAberto(false);
                          }}
                        >
                          <User className="mr-3 h-5 w-5" />
                          <span>Meu Perfil</span>
                        </Button>
                      </nav>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-folium-silver dark:border-folium-silver/30 pt-4">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/20"
                        onClick={() => {
                          handleLogout();
                          setMenuMobileAberto(false);
                        }}
                      >
                        <LogOut className="mr-3 h-5 w-5" />
                        <span>Sair</span>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Barra de Busca Mobile */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar livros..."
              value={consulta}
              onChange={(e) => onMudancaConsulta(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 pr-20 py-2 w-full bg-folium-cream dark:bg-folium-steel border-folium-silver dark:border-folium-silver/30 focus:border-folium-sage dark:focus:border-folium-azure transition-colors"
            />
            <Button
              onClick={onSubmitBusca}
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-folium-sage hover:bg-folium-sage/90 text-white h-8 px-3"
              disabled={!consulta.trim()}
            >
              <Search className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
