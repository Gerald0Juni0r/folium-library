import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, ArrowLeft } from "../components/Icons";

const Cadastro = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-md">
      <div className="container" style={{ maxWidth: "400px" }}>
        <div className="text-center mb-xl">
          <div className="logo mb-md">
            <div className="logo-icon">
              <BookOpen size={24} />
            </div>
            <h1 className="logo-text">Folium</h1>
          </div>
          <p className="text-secondary">
            Crie sua conta e comece a organizar sua biblioteca
          </p>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title text-center">Criar Conta</h2>
          </div>
          <div className="text-center p-xl">
            <p className="mb-lg">Página em desenvolvimento...</p>
            <Link to="/login" className="btn btn-primary">
              Ir para Login
            </Link>
          </div>
        </div>

        <div className="text-center mt-md">
          <Link
            to="/"
            className="text-secondary"
            style={{ fontSize: "0.875rem" }}
          >
            <ArrowLeft size={16} /> Voltar para página inicial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
