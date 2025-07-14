import {
  Filter,
  Calendar,
  Globe,
  Tag,
  BookOpen,
  Heart,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useBookLists } from "./book-lists-provider";

interface SidebarBibliotecaProps {
  estaAberta: boolean;
  onToggle: () => void;
  filtros: {
    categoria: string;
    idioma: string;
    dataPublicacao: string;
    lista: string;
  };
  onMudancaFiltro: (chave: string, valor: string) => void;
  onLimparFiltros: () => void;
}

export function SidebarBiblioteca({
  estaAberta,
  onToggle,
  filtros,
  onMudancaFiltro,
  onLimparFiltros,
}: SidebarBibliotecaProps) {
  const { listas } = useBookLists();

  const categorias = [
    { value: "all", label: "Todas as Categorias" },
    { value: "fiction", label: "Ficção" },
    { value: "biography", label: "Biografia" },
    { value: "history", label: "História" },
    { value: "science", label: "Ciência" },
    { value: "technology", label: "Tecnologia" },
    { value: "philosophy", label: "Filosofia" },
    { value: "poetry", label: "Poesia" },
    { value: "art", label: "Arte" },
    { value: "business", label: "Negócios" },
    { value: "self-help", label: "Autoajuda" },
  ];

  const idiomas = [
    { value: "all", label: "Todos os Idiomas" },
    { value: "pt", label: "Português" },
    { value: "en", label: "Inglês" },
    { value: "es", label: "Espanhol" },
    { value: "fr", label: "Francês" },
    { value: "de", label: "Alemão" },
    { value: "it", label: "Italiano" },
    { value: "ja", label: "Japonês" },
    { value: "zh", label: "Chinês" },
  ];

  const datasPublicacao = [
    { value: "all", label: "Qualquer Época" },
    { value: "2020-", label: "Desde 2020" },
    { value: "2010-2020", label: "2010-2020" },
    { value: "2000-2010", label: "2000-2010" },
    { value: "1990-2000", label: "1990-2000" },
    { value: "-1990", label: "Antes de 1990" },
  ];

  const tiposLista = [
    { value: "all", label: "Buscar Livros", icon: BookOpen },
    {
      value: "quero-ler",
      label: `Quero Ler (${listas["quero-ler"].length})`,
      icon: BookOpen,
    },
    {
      value: "lido",
      label: `Lido (${listas.lido.length})`,
      icon: Check,
    },
    {
      value: "favorito",
      label: `Favoritos (${listas.favorito.length})`,
      icon: Heart,
    },
  ];

  return (
    <>
      {/* Botão Toggle para Mobile */}
      <Button
        onClick={onToggle}
        variant="outline"
        size="sm"
        className="md:hidden mb-4 bg-folium-cream dark:bg-folium-steel border-folium-silver dark:border-folium-silver/30"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filtros
      </Button>

      {/* Sidebar */}
      <aside
        className={`
          ${estaAberta ? "block" : "hidden md:block"}
          w-full md:w-80 space-y-4
        `}
      >
        {/* Minhas Listas */}
        <Card className="bg-folium-cream dark:bg-folium-steel border-folium-silver dark:border-folium-silver/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-folium-ink dark:text-folium-cream">
              <BookOpen className="h-5 w-5 mr-2 text-folium-sage" />
              Minhas Listas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {tiposLista.map((tipo) => {
              const Icon = tipo.icon;
              const isActive = filtros.lista === tipo.value;
              return (
                <Button
                  key={tipo.value}
                  onClick={() => onMudancaFiltro("lista", tipo.value)}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    isActive
                      ? "bg-folium-sage hover:bg-folium-sage/90 text-white"
                      : "hover:bg-folium-parchment dark:hover:bg-folium-silver/20"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tipo.label}
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Filtros de Busca */}
        {filtros.lista === "all" && (
          <Card className="bg-folium-cream dark:bg-folium-steel border-folium-silver dark:border-folium-silver/30">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-folium-ink dark:text-folium-cream">
                <Filter className="h-5 w-5 mr-2 text-folium-sage" />
                Filtros de Busca
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filtro de Categoria */}
              <div className="space-y-2">
                <Label className="flex items-center text-sm font-medium text-folium-ink dark:text-folium-cream">
                  <Tag className="h-4 w-4 mr-2 text-folium-sage" />
                  Categoria
                </Label>
                <Select
                  value={filtros.categoria}
                  onValueChange={(value) => onMudancaFiltro("categoria", value)}
                >
                  <SelectTrigger className="bg-background border-folium-silver dark:border-folium-silver/30">
                    <SelectValue placeholder="Selecionar categoria..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria.value} value={categoria.value}>
                        {categoria.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator className="bg-folium-silver dark:bg-folium-silver/30" />

              {/* Filtro de Idioma */}
              <div className="space-y-2">
                <Label className="flex items-center text-sm font-medium text-folium-ink dark:text-folium-cream">
                  <Globe className="h-4 w-4 mr-2 text-folium-sage" />
                  Idioma
                </Label>
                <Select
                  value={filtros.idioma}
                  onValueChange={(value) => onMudancaFiltro("idioma", value)}
                >
                  <SelectTrigger className="bg-background border-folium-silver dark:border-folium-silver/30">
                    <SelectValue placeholder="Selecionar idioma..." />
                  </SelectTrigger>
                  <SelectContent>
                    {idiomas.map((idioma) => (
                      <SelectItem key={idioma.value} value={idioma.value}>
                        {idioma.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator className="bg-folium-silver dark:bg-folium-silver/30" />

              {/* Filtro de Data de Publicação */}
              <div className="space-y-2">
                <Label className="flex items-center text-sm font-medium text-folium-ink dark:text-folium-cream">
                  <Calendar className="h-4 w-4 mr-2 text-folium-sage" />
                  Data de Publicação
                </Label>
                <Select
                  value={filtros.dataPublicacao}
                  onValueChange={(value) =>
                    onMudancaFiltro("dataPublicacao", value)
                  }
                >
                  <SelectTrigger className="bg-background border-folium-silver dark:border-folium-silver/30">
                    <SelectValue placeholder="Selecionar período..." />
                  </SelectTrigger>
                  <SelectContent>
                    {datasPublicacao.map((data) => (
                      <SelectItem key={data.value} value={data.value}>
                        {data.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator className="bg-folium-silver dark:bg-folium-silver/30" />

              {/* Limpar Filtros */}
              <Button
                onClick={onLimparFiltros}
                variant="outline"
                className="w-full bg-background hover:bg-folium-parchment dark:hover:bg-folium-silver/20 border-folium-silver dark:border-folium-silver/30"
              >
                Limpar Todos os Filtros
              </Button>
            </CardContent>
          </Card>
        )}
      </aside>
    </>
  );
}
