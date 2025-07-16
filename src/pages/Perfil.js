import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, ArrowLeft } from "../components/Icons";

const Perfil = () => {
  return (
    <div className="min-h-screen p-md">
      <div className="container">
        <div className="flex items-center gap-md mb-xl">
          <Link to="/biblioteca" className="btn btn-icon btn-secondary">
            <ArrowLeft size={20} />
          </Link>
          <h1>Meu Perfil</h1>
        </div>

        <div className="card">
          <div className="text-center p-xl">
            <div className="hero-icon mb-lg">
              <BookOpen size={64} />
            </div>
            <h2 className="mb-md">Página em desenvolvimento</h2>
            <p className="text-secondary mb-lg">
              A funcionalidade de perfil está sendo desenvolvida...
            </p>
            <Link to="/biblioteca" className="btn btn-primary">
              Voltar para Biblioteca
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
