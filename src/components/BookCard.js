import React, { useState } from "react";
import { useBookLists } from "../contexts/BookListsContext";
import { toast } from "./Toast";
import {
  Heart,
  BookmarkPlus,
  BookmarkCheck,
  BookOpen,
  Star,
  MoreHorizontal,
} from "./Icons";

const BookCard = ({ book, showActions = true, compact = false }) => {
  const { livroEstaEmLista, adicionarALista, removerDaLista } = useBookLists();
  const [imageError, setImageError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Normalize book data from Google Books API
  const bookData = {
    id: book.id,
    titulo: book.volumeInfo?.title || book.titulo || "Título não disponível",
    autores: book.volumeInfo?.authors ||
      book.autores || ["Autor não disponível"],
    capa:
      book.volumeInfo?.imageLinks?.thumbnail ||
      book.volumeInfo?.imageLinks?.smallThumbnail ||
      book.capa ||
      null,
    categoria:
      book.volumeInfo?.categories?.[0] || book.categoria || "Categoria",
    descricao:
      book.volumeInfo?.description || book.descricao || "Sem descrição",
    avaliacaoMedia:
      book.volumeInfo?.averageRating || book.avaliacaoMedia || null,
    dataPublicacao:
      book.volumeInfo?.publishedDate || book.dataPublicacao || null,
    editora: book.volumeInfo?.publisher || book.editora || null,
    idioma: book.volumeInfo?.language || book.idioma || "pt",
    dataAdicao: book.dataAdicao || new Date().toISOString(),
  };

  const isInQueroLer = livroEstaEmLista(bookData.id, "quero-ler");
  const isInLido = livroEstaEmLista(bookData.id, "lido");
  const isInFavoritos = livroEstaEmLista(bookData.id, "favorito");

  const handleToggleList = (listType) => {
    const isInList = livroEstaEmLista(bookData.id, listType);

    if (isInList) {
      removerDaLista(listType, bookData.id);
      toast.success(`Removido de ${getListDisplayName(listType)}`);
    } else {
      adicionarALista(listType, bookData);
      toast.success(`Adicionado à ${getListDisplayName(listType)}`);
    }
    setMenuOpen(false);
  };

  const getListDisplayName = (listType) => {
    const names = {
      "quero-ler": "Quero Ler",
      lido: "Lidos",
      favorito: "Favoritos",
    };
    return names[listType] || listType;
  };

  const formatAuthors = (authors) => {
    if (!Array.isArray(authors)) return authors || "Autor desconhecido";
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return authors.join(" e ");
    return `${authors[0]} e outros`;
  };

  const renderStars = (rating) => {
    if (!rating) return null;
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={12} fill="currentColor" />);
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={12} fill="currentColor" opacity={0.5} />,
      );
    }

    return (
      <div className="book-rating">
        <div className="stars">{stars}</div>
        <span className="rating-text">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className={`book-card ${compact ? "book-card-compact" : ""}`}>
      {/* Book Cover */}
      <div className="book-cover">
        {bookData.capa && !imageError ? (
          <img
            src={bookData.capa}
            alt={`Capa do livro ${bookData.titulo}`}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="book-cover-placeholder">
            <BookOpen size={compact ? 24 : 32} />
          </div>
        )}

        {showActions && (
          <div className="book-cover-overlay">
            <button
              className={`quick-action-btn ${isInFavoritos ? "active" : ""}`}
              onClick={() => handleToggleList("favorito")}
              title={
                isInFavoritos
                  ? "Remover dos favoritos"
                  : "Adicionar aos favoritos"
              }
            >
              <Heart size={16} fill={isInFavoritos ? "currentColor" : "none"} />
            </button>
          </div>
        )}
      </div>

      {/* Book Info */}
      <div className="book-info">
        <h3 className="book-title" title={bookData.titulo}>
          {bookData.titulo}
        </h3>

        <p className="book-author" title={formatAuthors(bookData.autores)}>
          {formatAuthors(bookData.autores)}
        </p>

        {bookData.avaliacaoMedia && (
          <div className="book-meta">
            {renderStars(bookData.avaliacaoMedia)}
          </div>
        )}

        {!compact && <div className="book-category">{bookData.categoria}</div>}

        {showActions && (
          <div className="book-actions">
            <button
              className={`action-btn ${isInQueroLer ? "active" : ""}`}
              onClick={() => handleToggleList("quero-ler")}
              title={
                isInQueroLer ? "Remover de Quero Ler" : "Adicionar a Quero Ler"
              }
            >
              {isInQueroLer ? (
                <BookmarkCheck size={16} />
              ) : (
                <BookmarkPlus size={16} />
              )}
            </button>

            <button
              className={`action-btn ${isInLido ? "active" : ""}`}
              onClick={() => handleToggleList("lido")}
              title={isInLido ? "Remover de Lidos" : "Marcar como lido"}
            >
              <BookOpen size={16} />
            </button>

            <div className="action-menu">
              <button
                className="action-btn menu-trigger"
                onClick={() => setMenuOpen(!menuOpen)}
                title="Mais opções"
              >
                <MoreHorizontal size={16} />
              </button>

              {menuOpen && (
                <div className="action-menu-dropdown">
                  <button
                    onClick={() => handleToggleList("quero-ler")}
                    className={isInQueroLer ? "active" : ""}
                  >
                    <BookmarkPlus size={14} />
                    {isInQueroLer ? "Remover de Quero Ler" : "Quero Ler"}
                  </button>
                  <button
                    onClick={() => handleToggleList("lido")}
                    className={isInLido ? "active" : ""}
                  >
                    <BookOpen size={14} />
                    {isInLido ? "Remover de Lidos" : "Marcar como Lido"}
                  </button>
                  <button
                    onClick={() => handleToggleList("favorito")}
                    className={isInFavoritos ? "active" : ""}
                  >
                    <Heart size={14} />
                    {isInFavoritos ? "Remover dos Favoritos" : "Favoritar"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
