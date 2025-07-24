import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { saveLists, loadLists } from "../utils/dataManager";

// Context para gerenciar as listas de livros do usuário
const BookListsContext = createContext();

// Hook customizado para usar o contexto das listas
export const useBookLists = () => {
  const context = useContext(BookListsContext);
  if (!context) {
    throw new Error(
      "useBookLists deve ser usado dentro de um BookListsProvider",
    );
  }
  return context;
};

// Provider das listas de livros - gerencia estado e persistência
export const BookListsProvider = ({ children }) => {
  const { user } = useAuth();
  
  // Estado das três listas principais do usuário
  const [listas, setListas] = useState({
    "quero-ler": [],
    lido: [],
    favorito: [],
  });

  // Carrega listas salvas do localStorage quando usuário faz login
  useEffect(() => {
    if (user) {
      // Usa o sistema de backup para carregar listas
      const listasCarregadas = loadLists(user.id);

      // Se não há listas salvas e é o usuário de teste, adiciona exemplos
      if (Object.values(listasCarregadas).every(lista => lista.length === 0) &&
          user.email === "folium@folium.com") {
        // Adiciona livros de exemplo apenas para o usuário de teste
        const listasExemplo = {
          "quero-ler": [
            {
              id: "exemplo1",
              titulo: "O Hobbit",
              autores: ["J.R.R. Tolkien"],
              capa: "https://books.google.com/books/content?id=hFfhrCWiLSMC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
              dataAdicao: new Date().toISOString(),
            },
            {
              id: "exemplo2",
              titulo: "Sapiens",
              autores: ["Yuval Noah Harari"],
              capa: "https://books.google.com/books/content?id=FmyBAwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
              dataAdicao: new Date().toISOString(),
            },
          ],
          lido: [
            {
              id: "exemplo3",
              titulo: "1984",
              autores: ["George Orwell"],
              capa: "https://books.google.com/books/content?id=kotPYEqx7kMC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
              dataAdicao: new Date().toISOString(),
            },
          ],
          favorito: [
            {
              id: "exemplo4",
              titulo: "Dom Casmurro",
              autores: ["Machado de Assis"],
              capa: "https://books.google.com/books/content?id=K8VGAAAAYAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
              dataAdicao: new Date().toISOString(),
            },
          ],
        };
        setListas(listasExemplo);
      } else {
        // Carrega listas existentes
        setListas(listasCarregadas);
      }
    } else {
      // Limpa listas quando usuário faz logout
      setListas({
        "quero-ler": [],
        lido: [],
        favorito: [],
      });
    }
  }, [user]);

  // Persiste listas no localStorage sempre que houver mudanças
  // Este useEffect garante que as listas sejam salvas automaticamente com backup
  useEffect(() => {
    if (user) {
      saveLists(listas, user.id);
    }
  }, [listas, user]);

  // Adiciona um livro a uma lista específica
  // Remove duplicatas automaticamente (caso livro já esteja na lista)
  const adicionarALista = (tipo, livro) => {
    setListas((prev) => ({
      ...prev,
      [tipo]: [...prev[tipo].filter((l) => l.id !== livro.id), livro],
    }));
  };

  // Remove um livro de uma lista específica
  const removerDaLista = (tipo, livroId) => {
    setListas((prev) => ({
      ...prev,
      [tipo]: prev[tipo].filter((l) => l.id !== livroId),
    }));
  };

  // Verifica se um livro específico está em uma lista
  const livroEstaEmLista = (livroId, tipo) => {
    return listas[tipo].some((l) => l.id === livroId);
  };

  // Retorna todos os livros de uma lista específica
  const obterLivrosPorTipo = (tipo) => {
    return listas[tipo];
  };

  // Limpa todas as listas (usado no logout)
  const limparTodasListas = () => {
    setListas({
      "quero-ler": [],
      lido: [],
      favorito: [],
    });
    localStorage.removeItem("folium-listas");
  };

  // Funções e estado disponíveis para componentes filhos
  const value = {
    listas,
    adicionarALista,
    removerDaLista,
    livroEstaEmLista,
    obterLivrosPorTipo,
    limparTodasListas,
  };

  return (
    <BookListsContext.Provider value={value}>
      {children}
    </BookListsContext.Provider>
  );
};
