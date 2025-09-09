import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "../components/Toast";
import { BookOpen, Mail, Lock, Eye, EyeOff, User } from "../components/Icons";

const Cadastro = () => {
  const navigate = useNavigate();
  const { cadastrar } = useAuth();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validações
    if (!formData.nome.trim()) {
      toast.error("Nome é obrigatório");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email é obrigatório");
      return;
    }

    if (!formData.senha) {
      toast.error("Senha é obrigatória");
      return;
    }

    if (formData.senha.length < 6) {
      toast.error("Senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      toast.error("Senhas não coincidem");
      return;
    }

    setIsLoading(true);

    try {
      const result = await cadastrar(
        formData.nome.trim(),
        formData.email.trim(),
        formData.senha,
      );

      if (result.success) {
        toast.success("Conta criada com sucesso!");
        navigate("/biblioteca");
      } else {
        toast.error(result.error || "Erro ao criar conta");
      }
    } catch (error) {
      toast.error("Erro ao criar conta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-md">
      <div className="container" style={{ maxWidth: "400px" }}>
        {/* Logo */}
        <div className="text-center mb-xl">
          <div className="logo mb-md">
            <div className="logo-icon">
              <BookOpen size={24} />
            </div>
            <h1 className="logo-text">Folium</h1>
          </div>
          <p className="text-secondary">
            Crie sua conta e comece a organizar sua biblioteca pessoal
          </p>
        </div>

        {/* Formulário */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title text-center">Criar Conta</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-md">
              <label htmlFor="nome" className="form-label">
                <User size={16} /> Nome Completo
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                placeholder="Seu nome completo"
                value={formData.nome}
                onChange={handleChange}
                required
                className="input"
              />
            </div>

            <div className="mb-md">
              <label htmlFor="email" className="form-label">
                <Mail size={16} /> Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="input"
              />
            </div>

            <div className="mb-md">
              <label htmlFor="senha" className="form-label">
                <Lock size={16} /> Senha
              </label>
              <div className="input-group">
                <input
                  id="senha"
                  name="senha"
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Mínimo 6 caracteres"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                  minLength="6"
                  className="input"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="input-icon-btn"
                >
                  {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="mb-md">
              <label htmlFor="confirmarSenha" className="form-label">
                <Lock size={16} /> Confirmar Senha
              </label>
              <div className="input-group">
                <input
                  id="confirmarSenha"
                  name="confirmarSenha"
                  type={mostrarConfirmarSenha ? "text" : "password"}
                  placeholder="Digite a senha novamente"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  required
                  className="input"
                />
                <button
                  type="button"
                  onClick={() =>
                    setMostrarConfirmarSenha(!mostrarConfirmarSenha)
                  }
                  className="input-icon-btn"
                >
                  {mostrarConfirmarSenha ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={isLoading}
            >
              {isLoading ? "Criando conta..." : "Criar Conta"}
            </button>
          </form>

          <div className="text-center mt-lg">
            <p style={{ fontSize: "0.875rem" }}>
              Já tem uma conta?{" "}
              <Link to="/login" className="text-accent">
                Faça login
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-md">
          <Link
            to="/"
            className="text-secondary"
            style={{ fontSize: "0.875rem" }}
          >
            ← Voltar para página inicial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
