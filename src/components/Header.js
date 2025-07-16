import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import {
  BookOpen,
  User,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Search,
  Heart,
  BookmarkCheck,
} from "./Icons";

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/biblioteca" className="logo">
            <div className="logo-icon">
              <BookOpen size={20} />
            </div>
            <div className="logo-text">
              <h1>Folium</h1>
            </div>
          </Link>

          {/* User Actions Desktop */}
          <div className="user-actions-desktop">
            <button
              onClick={toggleTheme}
              className="btn-icon"
              title="Trocar tema"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <Link to="/perfil" className="btn-icon" title="Perfil">
              <User size={18} />
            </Link>

            <div className="user-info">
              <span>Olá, {user?.nome || "Usuário"}!</span>
            </div>

            <button onClick={handleLogout} className="btn btn-outline btn-sm">
              <LogOut size={16} />
              Sair
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              <div className="mobile-user-info">
                <User size={20} />
                <span>Olá, {user?.nome || "Usuário"}!</span>
              </div>

              <nav className="mobile-nav">
                <Link
                  to="/biblioteca"
                  className="mobile-nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  <Search size={16} />
                  Buscar
                </Link>
                <Link
                  to="/biblioteca?tab=quero-ler"
                  className="mobile-nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  <BookmarkCheck size={16} />
                  Quero Ler
                </Link>
                <Link
                  to="/biblioteca?tab=lido"
                  className="mobile-nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  <BookOpen size={16} />
                  Lidos
                </Link>
                <Link
                  to="/biblioteca?tab=favoritos"
                  className="mobile-nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  <Heart size={16} />
                  Favoritos
                </Link>
                <Link
                  to="/perfil"
                  className="mobile-nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  <User size={16} />
                  Meu Perfil
                </Link>
              </nav>

              <div className="mobile-actions">
                <button onClick={toggleTheme} className="mobile-action-btn">
                  {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
                  {theme === "light" ? "Modo Escuro" : "Modo Claro"}
                </button>
                <button
                  onClick={handleLogout}
                  className="mobile-action-btn logout"
                >
                  <LogOut size={16} />
                  Sair da Conta
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
