import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const BookListsContext = createContext();

export const useBookLists = () => {
  const context = useContext(BookListsContext);
  if (!context) {
    throw new Error(
      "useBookLists deve ser usado dentro de um BookListsProvider",
    );
  }
  return context;
};

export const BookListsProvider = ({ children }) => {
  const { usuario } = useAuth();
  const [listas, setListas] = useState({
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
      } else if (usuario.email === "folium@folium.com") {
        // Adicionar listas de exemplo para o usuário teste
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

  const adicionarALista = (tipo, livro) => {
    setListas((prev) => ({
      ...prev,
      [tipo]: [...prev[tipo].filter((l) => l.id !== livro.id), livro],
    }));
  };

  const removerDaLista = (tipo, livroId) => {
    setListas((prev) => ({
      ...prev,
      [tipo]: prev[tipo].filter((l) => l.id !== livroId),
    }));
  };

  const livroEstaEmLista = (livroId, tipo) => {
    return listas[tipo].some((l) => l.id === livroId);
  };

  const obterLivrosPorTipo = (tipo) => {
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
