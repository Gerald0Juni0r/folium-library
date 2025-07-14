import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./auth-provider";

export type TipoLista = "quero-ler" | "lido" | "favorito";

export interface LivroNaLista {
  id: string;
  titulo: string;
  autores: string[];
  capa?: string;
  dataAdicao: string;
}

interface BookListsContextType {
  listas: Record<TipoLista, LivroNaLista[]>;
  adicionarALista: (tipo: TipoLista, livro: LivroNaLista) => void;
  removerDaLista: (tipo: TipoLista, livroId: string) => void;
  livroEstaEmLista: (livroId: string, tipo: TipoLista) => boolean;
  obterLivrosPorTipo: (tipo: TipoLista) => LivroNaLista[];
  limparTodasListas: () => void;
}

const BookListsContext = createContext<BookListsContextType | undefined>(
  undefined,
);

interface BookListsProviderProps {
  children: ReactNode;
}

export function BookListsProvider({ children }: BookListsProviderProps) {
  const { usuario } = useAuth();
  const [listas, setListas] = useState<Record<TipoLista, LivroNaLista[]>>({
    "quero-ler": [],
    lido: [],
    favorito: [],
  });

  // Carregar listas do localStorage quando usuário fizer login
  useEffect(() => {
    if (usuario) {
      const listaSalvas = localStorage.getItem("folium-listas");
      if (listaSalvas) {
        try {
          setListas(JSON.parse(listaSalvas));
        } catch (error) {
          console.error("Erro ao carregar listas:", error);
        }
      }
    } else {
      // Limpar listas quando usuário fizer logout
      setListas({
        "quero-ler": [],
        lido: [],
        favorito: [],
      });
    }
  }, [usuario]);

  // Salvar listas no localStorage sempre que mudarem
  useEffect(() => {
    if (usuario) {
      localStorage.setItem("folium-listas", JSON.stringify(listas));
    }
  }, [listas, usuario]);

  const adicionarALista = (tipo: TipoLista, livro: LivroNaLista) => {
    setListas((prev) => ({
      ...prev,
      [tipo]: [...prev[tipo].filter((l) => l.id !== livro.id), livro],
    }));
  };

  const removerDaLista = (tipo: TipoLista, livroId: string) => {
    setListas((prev) => ({
      ...prev,
      [tipo]: prev[tipo].filter((l) => l.id !== livroId),
    }));
  };

  const livroEstaEmLista = (livroId: string, tipo: TipoLista): boolean => {
    return listas[tipo].some((l) => l.id === livroId);
  };

  const obterLivrosPorTipo = (tipo: TipoLista): LivroNaLista[] => {
    return listas[tipo];
  };

  const limparTodasListas = () => {
    setListas({
      "quero-ler": [],
      lido: [],
      favorito: [],
    });
    localStorage.removeItem("folium-listas");
  };

  return (
    <BookListsContext.Provider
      value={{
        listas,
        adicionarALista,
        removerDaLista,
        livroEstaEmLista,
        obterLivrosPorTipo,
        limparTodasListas,
      }}
    >
      {children}
    </BookListsContext.Provider>
  );
}

export const useBookLists = () => {
  const context = useContext(BookListsContext);
  if (context === undefined) {
    throw new Error(
      "useBookLists deve ser usado dentro de um BookListsProvider",
    );
  }
  return context;
};
