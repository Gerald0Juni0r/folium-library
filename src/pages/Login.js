import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "../components/Toast";
import { BookOpen, Mail, Lock, Eye, EyeOff } from "../components/Icons";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(formData.email, formData.senha);
      if (result.success) {
        toast.success("Login realizado com sucesso!");
        navigate("/biblioteca");
      } else {
        toast.error(result.error || "Email ou senha inválidos");
      }
    } catch (error) {
      toast.error("Erro ao fazer login. Tente novamente.");
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

  const preencherTeste = () => {
    setFormData({ email: "folium@folium.com", senha: "123456" });
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
            Entre na sua conta para descobrir novos livros
          </p>
        </div>

        {/* Credenciais de Teste */}
        <div
          className="card mb-lg"
          style={{
            backgroundColor: "rgba(127, 179, 211, 0.1)",
            border: "1px solid rgba(127, 179, 211, 0.2)",
          }}
        >
          <h3 className="mb-sm">🧪 Credenciais de Teste</h3>
          <div className="mb-sm">
            <p style={{ fontSize: "0.875rem", marginBottom: "0.25rem" }}>
              <strong>Email:</strong> folium@folium.com
            </p>
            <p style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              <strong>Senha:</strong> 123456
            </p>
          </div>
          <button
            onClick={preencherTeste}
            className="btn btn-outline btn-sm btn-block"
          >
            Preencher Automaticamente
          </button>
        </div>

        {/* Formulário */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title text-center">Entrar</h2>
          </div>

          <form onSubmit={handleSubmit}>
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
                  placeholder="Sua senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
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

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="text-center mt-lg">
            <p style={{ fontSize: "0.875rem" }}>
              Não tem uma conta?{" "}
              <Link to="/cadastro" className="text-accent">
                Cadastre-se
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

export default Login;
