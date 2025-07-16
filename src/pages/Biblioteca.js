import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { BookOpen, Loader } from "../components/Icons";

const Biblioteca = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size={32} />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <header
        style={{
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--bg-primary)",
          padding: "var(--spacing-md) 0",
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="logo">
              <div
                className="logo-icon"
                style={{ width: "40px", height: "40px" }}
              >
                <BookOpen size={20} />
              </div>
              <div>
                <h1 style={{ fontSize: "1.5rem", margin: "0" }}>Folium</h1>
                <p style={{ fontSize: "0.75rem", margin: "0" }}>
                  Sua biblioteca pessoal
                </p>
              </div>
            </div>
            <div>
              <p>Olá, {usuario.nome}!</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container p-xl">
        <div className="text-center">
          <div className="hero-icon mb-lg">
            <BookOpen size={64} />
          </div>
          <h1 className="mb-md">Bem-vindo à sua biblioteca!</h1>
          <p className="text-secondary mb-lg">
            A funcionalidade completa da biblioteca está sendo desenvolvida...
          </p>
          <div className="grid grid-cols-1 md-grid-cols-3 gap-lg">
            <div className="card text-center">
              <h3>Buscar Livros</h3>
              <p className="text-secondary">Em desenvolvimento</p>
            </div>
            <div className="card text-center">
              <h3>Minhas Listas</h3>
              <p className="text-secondary">Em desenvolvimento</p>
            </div>
            <div className="card text-center">
              <h3>Perfil</h3>
              <p className="text-secondary">Em desenvolvimento</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Biblioteca;
