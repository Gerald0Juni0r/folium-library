import { Loader2, BookOpen, Search as SearchIcon } from "lucide-react";
import { CartaoLivro } from "./cartao-livro";
import { TipoLista } from "./book-lists-provider";

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

interface ResultadosBuscaProps {
  livros: InfoLivro[];
  isLoading: boolean;
  erro: string | null;
  consulta: string;
  totalResultados: number;
  modoVisualizacao: "busca" | "lista";
  tipoLista?: TipoLista;
}

const titulosLista = {
  "quero-ler": "Quero Ler",
  lido: "Lidos",
  favorito: "Favoritos",
};

export function ResultadosBusca({
  livros,
  isLoading,
  erro,
  consulta,
  totalResultados,
  modoVisualizacao,
  tipoLista,
}: ResultadosBuscaProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-folium-sage" />
        <p className="text-muted-foreground">Buscando livros...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <SearchIcon className="h-8 w-8 text-destructive" />
        </div>
        <div className="text-center">
          <h3 className="font-serif font-semibold text-lg text-folium-ink dark:text-folium-cream mb-2">
            Erro na Busca
          </h3>
          <p className="text-muted-foreground max-w-md">{erro}</p>
        </div>
      </div>
    );
  }

  if (modoVisualizacao === "busca" && !consulta) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <div className="w-20 h-20 rounded-full bg-folium-sage/10 flex items-center justify-center">
          <BookOpen className="h-10 w-10 text-folium-sage" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="font-serif font-semibold text-xl text-folium-ink dark:text-folium-cream">
            Bem-vindo à sua biblioteca!
          </h3>
          <p className="text-muted-foreground max-w-md">
            Use a barra de busca acima para descobrir novos livros ou navegue
            pelas suas listas na barra lateral.
          </p>
        </div>
      </div>
    );
  }

  if (modoVisualizacao === "busca" && livros.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
          <SearchIcon className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="text-center">
          <h3 className="font-serif font-semibold text-lg text-folium-ink dark:text-folium-cream mb-2">
            Nenhum Livro Encontrado
          </h3>
          <p className="text-muted-foreground max-w-md">
            Não encontramos livros correspondentes a "{consulta}". Tente
            palavras-chave diferentes ou verifique a ortografia.
          </p>
        </div>
      </div>
    );
  }

  if (modoVisualizacao === "lista" && livros.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
          <BookOpen className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="text-center">
          <h3 className="font-serif font-semibold text-lg text-folium-ink dark:text-folium-cream mb-2">
            Lista Vazia
          </h3>
          <p className="text-muted-foreground max-w-md">
            {tipoLista
              ? `Você ainda não tem livros na lista "${titulosLista[tipoLista]}".`
              : "Esta lista está vazia."}{" "}
            Comece buscando e adicionando livros às suas listas!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho dos Resultados */}
      <div className="border-b border-folium-silver dark:border-folium-silver/30 pb-4">
        <h2 className="font-serif font-semibold text-xl text-folium-ink dark:text-folium-cream">
          {modoVisualizacao === "busca"
            ? "Resultados da Busca"
            : tipoLista
              ? titulosLista[tipoLista]
              : "Minha Lista"}
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          {modoVisualizacao === "busca" ? (
            <>
              Encontrado{totalResultados === 1 ? "" : "s"}{" "}
              {totalResultados.toLocaleString()} livro
              {totalResultados !== 1 ? "s" : ""} para "{consulta}"
            </>
          ) : (
            <>
              {totalResultados.toLocaleString()} livro
              {totalResultados !== 1 ? "s" : ""} na lista
            </>
          )}
        </p>
      </div>

      {/* Grid de Livros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {livros.map((livro) => (
          <CartaoLivro key={livro.id} livro={livro} />
        ))}
      </div>
    </div>
  );
}
