import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, ArrowLeft } from "../components/Icons";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary p-md">
      <div className="text-center">
        <div className="hero-icon mb-lg">
          <BookOpen size={64} />
        </div>
        <h1 className="mb-md">Página não encontrada</h1>
        <p className="text-secondary mb-lg">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={20} />
          Voltar ao início
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
