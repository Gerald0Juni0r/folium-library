import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import {
  BookOpen,
  Search,
  Heart,
  Star,
  Users,
  ArrowRight,
  Check,
  Menu,
  Sun,
  Moon,
} from "../components/Icons";
import "./LandingPage.css";

const LandingPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const features = [
    {
      icon: <Search size={24} />,
      title: "Busca Inteligente",
      description:
        "Encontre livros por título, autor ou categoria usando nossa busca avançada com filtros.",
    },
    {
      icon: <Heart size={24} />,
      title: "Listas Personalizadas",
      description:
        'Organize seus livros em "Quero Ler", "Lido" e "Favoritos" para um controle completo.',
    },
    {
      icon: <Star size={24} />,
      title: "Descoberta",
      description:
        "Descubra novos livros com avaliações, sinopses e informações detalhadas de cada obra.",
    },
  ];

  const benefits = [
    "Interface limpa e intuitiva",
    "Busca rápida e precisa",
    "Organização por categorias",
    "Acompanhamento de progresso",
    "Modo escuro/claro",
    "Acesso gratuito",
  ];

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <div className="logo-icon">
                <BookOpen size={20} />
              </div>
              <h1 className="logo-text">Folium</h1>
            </div>

            <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
              <button
                className="btn btn-icon theme-toggle"
                onClick={toggleTheme}
                aria-label="Alternar tema"
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <Link to="/login" className="btn btn-secondary">
                Entrar
              </Link>
              <Link to="/cadastro" className="btn btn-primary">
                Criar conta
              </Link>
            </nav>

            <button
              className="btn btn-icon menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-icon">
              <BookOpen size={40} />
            </div>
            <h1 className="hero-title">
              Organize sua
              <br />
              <span className="text-accent">biblioteca pessoal</span>
            </h1>
            <p className="hero-description">
              Descubra novos livros, organize suas leituras e mantenha o
              controle do que você já leu, quer ler e dos seus favoritos.
            </p>

            <div className="hero-actions">
              <Link to="/cadastro" className="btn btn-primary btn-lg">
                Começar agora
                <ArrowRight size={20} />
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg">
                Já tenho conta
              </Link>
            </div>

            {/* Preview */}
            <div className="hero-preview">
              <div className="preview-placeholder">
                <BookOpen size={64} />
                <p>Interface da biblioteca (visível após login)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Recursos principais</h2>
            <p>
              Tudo que você precisa para organizar e descobrir livros incríveis
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <div className="benefits-content">
            <div className="benefits-text">
              <h2>Por que escolher o Folium?</h2>
              <div className="benefits-list">
                {benefits.map((benefit, index) => (
                  <div key={index} className="benefit-item">
                    <div className="benefit-check">
                      <Check size={16} />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="benefits-visual">
              <div className="stats-card">
                <Users size={48} />
                <div className="stats-number">1000+</div>
                <div className="stats-label">Leitores organizados</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Pronto para organizar sua biblioteca?</h2>
            <p>
              Comece agora mesmo e descubra uma nova forma de gerenciar suas
              leituras.
            </p>
            <Link to="/cadastro" className="btn btn-lg cta-button">
              Criar conta grátis
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <div className="logo-icon">
                  <BookOpen size={16} />
                </div>
                <h3>Folium</h3>
              </div>
              <p>
                Sua biblioteca pessoal digital. Organize, descubra e acompanhe
                suas leituras.
              </p>
            </div>

            <div className="footer-section">
              <h4>Produto</h4>
              <ul>
                <li>
                  <a href="#funcionalidades">Funcionalidades</a>
                </li>
                <li>
                  <a href="#preco">Preços</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Empresa</h4>
              <ul>
                <li>
                  <a href="#sobre">Sobre nós</a>
                </li>
                <li>
                  <a href="#contato">Contato</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Legal</h4>
              <ul>
                <li>
                  <a href="#termos">Termos de Uso</a>
                </li>
                <li>
                  <a href="#privacidade">Privacidade</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2024 Folium. Todos os direitos reservados.</p>
            <p className="footer-love">
              Feito com <Heart size={16} filled /> para amantes de livros
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
