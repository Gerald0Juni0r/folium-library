import { useState } from "react";
import {
  Heart,
  BookmarkPlus,
  ExternalLink,
  Star,
  Check,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useBookLists, TipoLista, LivroNaLista } from "./book-lists-provider";

interface InfoLivro {
  id: string;
  titulo: string;
  autores: string[];
  descricao?: string;
  capa?: string;
  categorias?: string[];
  dataPublicacao?: string;
  numeroPaginas?: number;
  avaliacaoMedia?: number;
  idioma?: string;
  linkPreview?: string;
}

interface CartaoLivroProps {
  livro: InfoLivro;
}

export function CartaoLivro({ livro }: CartaoLivroProps) {
  const { adicionarALista, removerDaLista, livroEstaEmLista } = useBookLists();

  const formatarAutores = (autores: string[]) => {
    if (!autores || autores.length === 0) return "Autor Desconhecido";
    if (autores.length === 1) return autores[0];
    if (autores.length === 2) return autores.join(" & ");
    return `${autores[0]} & ${autores.length - 1} outros`;
  };

  const truncarTexto = (texto: string, maxLength: number) => {
    if (!texto) return "";
    return texto.length > maxLength ? `${texto.slice(0, maxLength)}...` : texto;
  };

  const criarLivroParaLista = (): LivroNaLista => ({
    id: livro.id,
    titulo: livro.titulo,
    autores: livro.autores,
    capa: livro.capa,
    dataAdicao: new Date().toISOString(),
  });

  const handleAdicionarALista = (tipo: TipoLista) => {
    const livroParaLista = criarLivroParaLista();
    adicionarALista(tipo, livroParaLista);

    const nomesLista = {
      "quero-ler": "Quero Ler",
      lido: "Lido",
      favorito: "Favoritos",
    };

    toast.success(`Livro adicionado à lista "${nomesLista[tipo]}"`);
  };

  const handleRemoverDaLista = (tipo: TipoLista) => {
    removerDaLista(tipo, livro.id);

    const nomesLista = {
      "quero-ler": "Quero Ler",
      lido: "Lido",
      favorito: "Favoritos",
    };

    toast.success(`Livro removido da lista "${nomesLista[tipo]}"`);
  };

  const estaEmQueroLer = livroEstaEmLista(livro.id, "quero-ler");
  const estaEmLido = livroEstaEmLista(livro.id, "lido");
  const estaEmFavorito = livroEstaEmLista(livro.id, "favorito");

  return (
    <Card className="group h-full bg-folium-cream dark:bg-folium-steel border-folium-silver dark:border-folium-silver/30 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in">
      <CardContent className="p-4 h-full flex flex-col">
        <div className="flex gap-4 h-full">
          {/* Capa do Livro */}
          <div className="flex-shrink-0">
            <div className="w-20 h-28 md:w-24 md:h-32 rounded-md overflow-hidden bg-folium-parchment dark:bg-folium-silver/20 border border-folium-silver dark:border-folium-silver/30">
              {livro.capa ? (
                <img
                  src={livro.capa.replace("&edge=curl", "")}
                  alt={livro.titulo}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookmarkPlus className="h-6 w-6 text-folium-sepia dark:text-folium-sepia" />
                </div>
              )}
            </div>
          </div>

          {/* Informações do Livro */}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Título e Autor */}
            <div className="mb-2">
              <h3 className="font-serif font-semibold text-folium-ink dark:text-folium-cream line-clamp-2 text-sm md:text-base leading-tight">
                {livro.titulo}
              </h3>
              <p className="text-folium-sepia dark:text-folium-parchment text-xs md:text-sm mt-1">
                {formatarAutores(livro.autores)}
              </p>
            </div>

            {/* Metadados */}
            <div className="flex flex-wrap gap-1 mb-2">
              {livro.dataPublicacao && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-folium-parchment dark:bg-folium-silver/20 text-folium-sepia dark:text-folium-parchment border-0"
                >
                  {new Date(livro.dataPublicacao).getFullYear()}
                </Badge>
              )}
              {livro.categorias && livro.categorias[0] && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-folium-sage/20 text-folium-sage dark:bg-folium-sage/30 dark:text-folium-sage border-0"
                >
                  {livro.categorias[0]}
                </Badge>
              )}
              {livro.avaliacaoMedia && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-folium-azure/20 text-folium-azure dark:bg-folium-azure/30 dark:text-folium-azure border-0 flex items-center gap-1"
                >
                  <Star className="h-3 w-3" />
                  {livro.avaliacaoMedia.toFixed(1)}
                </Badge>
              )}
            </div>

            {/* Descrição */}
            {livro.descricao && (
              <p className="text-xs md:text-sm text-muted-foreground line-clamp-3 mb-3 flex-1">
                {truncarTexto(livro.descricao.replace(/<[^>]*>/g, ""), 120)}
              </p>
            )}

            {/* Ações */}
            <div className="flex gap-2 mt-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-background hover:bg-folium-parchment dark:hover:bg-folium-silver/20 border-folium-silver dark:border-folium-silver/30"
                  >
                    <MoreHorizontal className="h-3 w-3 mr-1" />
                    Adicionar
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Adicionar à lista</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() =>
                      estaEmQueroLer
                        ? handleRemoverDaLista("quero-ler")
                        : handleAdicionarALista("quero-ler")
                    }
                    className="cursor-pointer"
                  >
                    <BookmarkPlus className="h-4 w-4 mr-2" />
                    {estaEmQueroLer ? "Remover de " : ""}Quero Ler
                    {estaEmQueroLer && <Check className="h-4 w-4 ml-auto" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      estaEmLido
                        ? handleRemoverDaLista("lido")
                        : handleAdicionarALista("lido")
                    }
                    className="cursor-pointer"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    {estaEmLido ? "Remover de " : ""}Lido
                    {estaEmLido && <Check className="h-4 w-4 ml-auto" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      estaEmFavorito
                        ? handleRemoverDaLista("favorito")
                        : handleAdicionarALista("favorito")
                    }
                    className="cursor-pointer"
                  >
                    <Heart
                      className={`h-4 w-4 mr-2 ${estaEmFavorito ? "fill-current" : ""}`}
                    />
                    {estaEmFavorito ? "Remover dos " : ""}Favoritos
                    {estaEmFavorito && <Check className="h-4 w-4 ml-auto" />}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {livro.linkPreview && (
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-background hover:bg-folium-parchment dark:hover:bg-folium-silver/20 border-folium-silver dark:border-folium-silver/30"
                  onClick={() => window.open(livro.linkPreview, "_blank")}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
