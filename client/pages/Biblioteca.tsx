import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderBiblioteca } from "@/components/header-biblioteca";
import { SidebarBiblioteca } from "@/components/sidebar-biblioteca";
import { ResultadosBusca } from "@/components/resultados-busca";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { useBookLists } from "@/components/book-lists-provider";

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

interface RespostaBusca {
  livros: InfoLivro[];
  totalItens: number;
  paginaAtual: number;
  totalPaginas: number;
}

export default function Biblioteca() {
  const navigate = useNavigate();
  const { usuario, isLoading: authLoading } = useAuth();
  const { obterLivrosPorTipo } = useBookLists();

  const [consulta, setConsulta] = useState("");
  const [livros, setLivros] = useState<InfoLivro[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [totalResultados, setTotalResultados] = useState(0);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [filtros, setFiltros] = useState({
    categoria: "all",
    idioma: "all",
    dataPublicacao: "all",
    lista: "all", // Novo filtro para as listas
  });
  const [modoVisualizacao, setModoVisualizacao] = useState<"busca" | "lista">(
    "busca",
  );

  // Redirecionar se não estiver logado
  useEffect(() => {
    if (!authLoading && !usuario) {
      navigate("/login");
    }
  }, [usuario, authLoading, navigate]);

  const buscarLivros = async (
    query: string,
    pagina: number = 1,
    anexarResultados: boolean = false,
  ) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setErro(null);

    try {
      const indiceInicio = (pagina - 1) * 12;
      const params = new URLSearchParams({
        q: query,
        startIndex: indiceInicio.toString(),
        maxResults: "12",
        category: filtros.categoria,
        language: filtros.idioma,
        publishedDate: filtros.dataPublicacao,
      });

      const response = await fetch(`/api/books/search?${params}`);

      if (!response.ok) {
        throw new Error("Falha ao buscar livros");
      }

      const data: RespostaBusca = await response.json();

      // Transformar dados para português
      const livrosPortugues = data.livros.map((livro) => ({
        id: livro.id,
        titulo: livro.titulo,
        autores: livro.autores,
        descricao: livro.descricao,
        capa: livro.capa,
        categorias: livro.categorias,
        dataPublicacao: livro.dataPublicacao,
        numeroPaginas: livro.numeroPaginas,
        avaliacaoMedia: livro.avaliacaoMedia,
        idioma: livro.idioma,
        linkPreview: livro.linkPreview,
      }));

      if (anexarResultados) {
        setLivros((prev) => [...prev, ...livrosPortugues]);
      } else {
        setLivros(livrosPortugues);
      }

      setTotalResultados(data.totalItens);
      setPaginaAtual(data.paginaAtual);
      setTotalPaginas(data.totalPaginas);
    } catch (err) {
      setErro(
        err instanceof Error ? err.message : "Ocorreu um erro inesperado",
      );
      if (!anexarResultados) {
        setLivros([]);
        setTotalResultados(0);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBusca = () => {
    setModoVisualizacao("busca");
    setPaginaAtual(1);
    buscarLivros(consulta, 1, false);
  };

  const handleCarregarMais = () => {
    if (paginaAtual < totalPaginas && !isLoading) {
      buscarLivros(consulta, paginaAtual + 1, true);
    }
  };

  const handleMudancaFiltro = (chave: string, valor: string) => {
    setFiltros((prev) => ({ ...prev, [chave]: valor }));

    // Se mudou para filtro de lista, mudar modo de visualização
    if (chave === "lista" && valor !== "all") {
      setModoVisualizacao("lista");
      const livrosDaLista = obterLivrosPorTipo(
        valor as "quero-ler" | "lido" | "favorito",
      );
      setLivros(
        livrosDaLista.map((l) => ({
          id: l.id,
          titulo: l.titulo,
          autores: l.autores,
          capa: l.capa,
        })),
      );
      setTotalResultados(livrosDaLista.length);
      setConsulta("");
    } else if (chave === "lista" && valor === "all") {
      setModoVisualizacao("busca");
      setLivros([]);
      setTotalResultados(0);
    }
  };

  const handleLimparFiltros = () => {
    setFiltros({
      categoria: "all",
      idioma: "all",
      dataPublicacao: "all",
      lista: "all",
    });
    setModoVisualizacao("busca");
    setLivros([]);
    setTotalResultados(0);
    setConsulta("");
  };

  // Re-buscar quando filtros de busca mudarem
  useEffect(() => {
    if (consulta && modoVisualizacao === "busca") {
      setPaginaAtual(1);
      buscarLivros(consulta, 1, false);
    }
  }, [filtros.categoria, filtros.idioma, filtros.dataPublicacao]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoaderIcon className="h-8 w-8 animate-spin text-folium-sage" />
      </div>
    );
  }

  if (!usuario) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <HeaderBiblioteca
        consulta={consulta}
        onMudancaConsulta={setConsulta}
        onSubmitBusca={handleBusca}
        usuario={usuario}
      />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <SidebarBiblioteca
              estaAberta={sidebarAberta}
              onToggle={() => setSidebarAberta(!sidebarAberta)}
              filtros={filtros}
              onMudancaFiltro={handleMudancaFiltro}
              onLimparFiltros={handleLimparFiltros}
            />
          </div>

          {/* Conteúdo Principal */}
          <div className="flex-1 min-w-0">
            <ResultadosBusca
              livros={livros}
              isLoading={isLoading && paginaAtual === 1}
              erro={erro}
              consulta={consulta}
              totalResultados={totalResultados}
              modoVisualizacao={modoVisualizacao}
              tipoLista={
                filtros.lista !== "all"
                  ? (filtros.lista as "quero-ler" | "lido" | "favorito")
                  : undefined
              }
            />

            {/* Botão Carregar Mais */}
            {livros.length > 0 &&
              paginaAtual < totalPaginas &&
              modoVisualizacao === "busca" && (
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={handleCarregarMais}
                    disabled={isLoading}
                    variant="outline"
                    className="bg-background hover:bg-folium-parchment dark:hover:bg-folium-silver/20 border-folium-silver dark:border-folium-silver/30"
                  >
                    {isLoading ? (
                      <>
                        <LoaderIcon className="h-4 w-4 mr-2 animate-spin" />
                        Carregando...
                      </>
                    ) : (
                      `Carregar mais livros (${totalResultados - livros.length} restantes)`
                    )}
                  </Button>
                </div>
              )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
