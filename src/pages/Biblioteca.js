import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useBookLists } from "../contexts/BookListsContext";
import Header from "../components/Header";
import BookCard from "../components/BookCard";
import { toast } from "../components/Toast";
import {
  Search,
  Filter,
  BookOpen,
  Heart,
  BookmarkCheck,
  X,
  Loader,
} from "../components/Icons";
import "../components/Header.css";
import "../components/BookCard.css";
import "./Biblioteca.css";

const Biblioteca = () => {
  const { user } = useAuth();
  const { listas, obterLivrosPorTipo } = useBookLists();
  const [searchParams, setSearchParams] = useSearchParams();

  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoadingPopular, setIsLoadingPopular] = useState(true);
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "search",
  );
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    categoria: "",
    idioma: "pt",
    ordenacao: "relevance",
  });

  // Load popular books on mount
  const loadPopularBooks = async () => {
    setIsLoadingPopular(true);
    try {
      const popularQueries = [
        "Harry Potter",
        "Dom Casmurro",
        "O Alquimista",
        "1984",
        "O Hobbit",
        "Sapiens",
        "O Pequeno Príncipe",
        "Cem Anos de Solidão",
      ];

      const randomQuery =
        popularQueries[Math.floor(Math.random() * popularQueries.length)];
      let searchUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(randomQuery)}&maxResults=20&orderBy=relevance`;

      const response = await fetch(searchUrl);
      const data = await response.json();

      if (data.items) {
        setPopularBooks(data.items);
      }
    } catch (error) {
      console.error("Erro ao carregar livros populares:", error);
    } finally {
      setIsLoadingPopular(false);
    }
  };

  // Google Books API search
  const searchBooks = async (query, filters = {}) => {
    // Check if there's any search criteria
    const hasQuery = query.trim();
    const hasCategory = filters.categoria;
    const hasNonDefaultLanguage = filters.idioma && filters.idioma !== "pt";
    const hasNonDefaultOrder =
      filters.ordenacao && filters.ordenacao !== "relevance";

    if (
      !hasQuery &&
      !hasCategory &&
      !hasNonDefaultLanguage &&
      !hasNonDefaultOrder
    ) {
      toast.error("Digite algo para buscar ou altere algum filtro");
      return;
    }

    setIsSearching(true);
    try {
      let searchQuery = query.trim() || "bestsellers";
      let searchUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=20`;

      // Add filters
      if (filters.categoria) {
        searchUrl += `&subject=${encodeURIComponent(filters.categoria)}`;
      }

      if (filters.idioma && filters.idioma !== "all") {
        searchUrl += `&langRestrict=${filters.idioma}`;
      }

      if (filters.ordenacao) {
        searchUrl += `&orderBy=${filters.ordenacao}`;
      }

      const response = await fetch(searchUrl);
      const data = await response.json();

      if (data.items) {
        setSearchResults(data.items);
        toast.success(`${data.items.length} livros encontrados`);
      } else {
        setSearchResults([]);
        toast.info("Nenhum livro encontrado");
      }
      setHasSearched(true);
    } catch (error) {
      console.error("Erro na busca:", error);
      toast.error("Erro ao buscar livros. Tente novamente.");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchBooks(searchQuery, searchFilters);
  };

  const handleFilterSearch = () => {
    searchBooks(searchQuery, searchFilters);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setHasSearched(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "search") {
      setSearchParams({});
    } else {
      setSearchParams({ tab });
    }
  };

  // Load popular books on mount
  useEffect(() => {
    loadPopularBooks();
  }, []);

  // Update active tab from URL params
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [searchParams, activeTab]);

  const getTabContent = () => {
    switch (activeTab) {
      case "quero-ler":
        return {
          title: "Quero Ler",
          icon: <BookmarkCheck size={20} />,
          books: obterLivrosPorTipo("quero-ler"),
          emptyMessage: "Você ainda não adicionou livros à lista 'Quero Ler'",
        };
      case "lido":
        return {
          title: "Livros Lidos",
          icon: <BookOpen size={20} />,
          books: obterLivrosPorTipo("lido"),
          emptyMessage: "Você ainda não marcou nenhum livro como lido",
        };
      case "favoritos":
        return {
          title: "Favoritos",
          icon: <Heart size={20} />,
          books: obterLivrosPorTipo("favorito"),
          emptyMessage: "Você ainda não favoritou nenhum livro",
        };
      default:
        return null;
    }
  };

  const tabContent = getTabContent();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-lg">
        {/* Tab Navigation */}
        <div className="tabs-container mb-lg">
          <div className="tabs">
            <button
              className={`tab ${activeTab === "search" ? "active" : ""}`}
              onClick={() => handleTabChange("search")}
            >
              <Search size={16} />
              <span className="tab-text-desktop">Buscar Livros</span>
              <span className="tab-text-mobile">Buscar</span>
            </button>
            <button
              className={`tab ${activeTab === "quero-ler" ? "active" : ""}`}
              onClick={() => handleTabChange("quero-ler")}
            >
              <BookmarkCheck size={16} />
              Quero Ler
              {listas["quero-ler"].length > 0 && (
                <span className="tab-badge">{listas["quero-ler"].length}</span>
              )}
            </button>
            <button
              className={`tab ${activeTab === "lido" ? "active" : ""}`}
              onClick={() => handleTabChange("lido")}
            >
              <BookOpen size={16} />
              Lidos
              {listas.lido.length > 0 && (
                <span className="tab-badge">{listas.lido.length}</span>
              )}
            </button>
            <button
              className={`tab ${activeTab === "favoritos" ? "active" : ""}`}
              onClick={() => handleTabChange("favoritos")}
            >
              <Heart size={16} />
              Favoritos
              {listas.favorito.length > 0 && (
                <span className="tab-badge">{listas.favorito.length}</span>
              )}
            </button>
          </div>
        </div>

        {/* Search Tab Content */}
        {activeTab === "search" && (
          <div className="search-section">
            {/* Search Form */}
            <div className="card mb-lg">
              <form onSubmit={handleSearch} className="search-form">
                <div className="search-input-group">
                  <Search size={20} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Busque por título, autor ou palavra-chave..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="clear-btn"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <div className="search-actions">
                  <button
                    type="button"
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="btn btn-outline"
                  >
                    <Filter size={16} />
                    Filtros
                  </button>
                  <button
                    type="submit"
                    disabled={
                      isSearching ||
                      (!searchQuery.trim() &&
                        !searchFilters.categoria &&
                        searchFilters.idioma === "pt" &&
                        searchFilters.ordenacao === "relevance")
                    }
                    className="btn btn-primary"
                  >
                    {isSearching ? (
                      <>
                        <Loader size={16} />
                        Buscando...
                      </>
                    ) : (
                      <>
                        <Search size={16} />
                        Buscar
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Search Filters */}
              {filterOpen && (
                <div className="search-filters">
                  <div className="filter-group">
                    <label className="filter-label">Categoria</label>
                    <select
                      value={searchFilters.categoria}
                      onChange={(e) => {
                        const newFilters = {
                          ...searchFilters,
                          categoria: e.target.value,
                        };
                        setSearchFilters(newFilters);
                      }}
                      className="filter-select"
                    >
                      <option value="">Todas as categorias</option>
                      <option value="fiction">Ficção</option>
                      <option value="science">Ciência</option>
                      <option value="history">História</option>
                      <option value="biography">Biografia</option>
                      <option value="technology">Tecnologia</option>
                      <option value="romance">Romance</option>
                      <option value="mystery">Mistério</option>
                      <option value="fantasy">Fantasia</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label className="filter-label">Idioma</label>
                    <select
                      value={searchFilters.idioma}
                      onChange={(e) => {
                        const newFilters = {
                          ...searchFilters,
                          idioma: e.target.value,
                        };
                        setSearchFilters(newFilters);
                      }}
                      className="filter-select"
                    >
                      <option value="all">Todos os idiomas</option>
                      <option value="pt">Português</option>
                      <option value="en">Inglês</option>
                      <option value="es">Espanhol</option>
                      <option value="fr">Francês</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label className="filter-label">Ordenação</label>
                    <select
                      value={searchFilters.ordenacao}
                      onChange={(e) => {
                        const newFilters = {
                          ...searchFilters,
                          ordenacao: e.target.value,
                        };
                        setSearchFilters(newFilters);
                      }}
                      className="filter-select"
                    >
                      <option value="relevance">Relevância</option>
                      <option value="newest">Mais novos</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Search Results */}
            {hasSearched && (
              <div className="search-results">
                {searchResults.length > 0 ? (
                  <>
                    <div className="results-header">
                      <h2>Resultados da busca</h2>
                      <p className="text-secondary">
                        {searchResults.length} livros encontrados
                        {searchQuery && ` para "${searchQuery}"`}
                      </p>
                    </div>
                    <div className="books-grid">
                      {searchResults.map((book) => (
                        <BookCard
                          key={book.id}
                          book={book}
                          showActions={true}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <Search size={48} />
                    </div>
                    <h3>Nenhum livro encontrado</h3>
                    <p>
                      Não encontramos livros para "{searchQuery}". Tente usar
                      palavras-chave diferentes ou verifique a ortografia.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Popular Books */}
            {!hasSearched && (
              <div className="popular-books">
                {isLoadingPopular ? (
                  <div className="loading-state">
                    <Loader size={32} />
                    <p>Carregando livros populares...</p>
                  </div>
                ) : popularBooks.length > 0 ? (
                  <>
                    <div className="results-header">
                      <h2>Livros Populares</h2>
                      <p className="text-secondary">
                        Descubra alguns dos livros mais procurados
                      </p>
                    </div>
                    <div className="books-grid">
                      {popularBooks.map((book) => (
                        <BookCard
                          key={book.id}
                          book={book}
                          showActions={true}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="search-welcome">
                    <div className="welcome-content">
                      <div className="welcome-icon">
                        <Search size={64} />
                      </div>
                      <h2>Descubra novos livros</h2>
                      <p>
                        Use a busca acima para encontrar livros por título,
                        autor ou palavra-chave. Nossa busca é integrada com a
                        Google Books API e oferece milhões de títulos.
                      </p>
                      <div className="search-tips">
                        <h4>Dicas de busca:</h4>
                        <ul>
                          <li>• Digite o título exato ou parte dele</li>
                          <li>• Busque pelo nome do autor</li>
                          <li>• Use palavras-chave relacionadas ao tema</li>
                          <li>• Experimente filtrar por categoria ou idioma</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* List Tab Content */}
        {tabContent && (
          <div className="list-section">
            <div className="list-header">
              <div className="list-title">
                {tabContent.icon}
                <h2>{tabContent.title}</h2>
              </div>
              {tabContent.books.length > 0 && (
                <p className="list-count">
                  {tabContent.books.length}{" "}
                  {tabContent.books.length === 1 ? "livro" : "livros"}
                </p>
              )}
            </div>

            {tabContent.books.length > 0 ? (
              <div className="books-grid">
                {tabContent.books.map((book) => (
                  <BookCard key={book.id} book={book} showActions={true} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">{tabContent.icon}</div>
                <h3>Lista vazia</h3>
                <p>{tabContent.emptyMessage}</p>
                <button
                  onClick={() => handleTabChange("search")}
                  className="btn btn-primary"
                >
                  <Search size={16} />
                  Buscar livros
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Biblioteca;
