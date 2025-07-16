import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useBookLists } from "../contexts/BookListsContext";
import { toast } from "../components/Toast";
import {
  ArrowLeft,
  User,
  Camera,
  Mail,
  Save,
  LogOut,
  BookOpen,
  Heart,
  BookmarkCheck,
} from "../components/Icons";
import Header from "../components/Header";
import "../components/Header.css";
import "./Perfil.css";

const Perfil = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: user?.nome || "",
    email: user?.email || "",
    foto: user?.foto || null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith("image/")) {
        toast.error("Por favor, selecione apenas arquivos de imagem");
        return;
      }

      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("A imagem deve ter no máximo 5MB");
        return;
      }

      // Converter para base64
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          foto: e.target.result,
        }));
        toast.success("Foto carregada com sucesso!");
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setFormData((prev) => ({
      ...prev,
      foto: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    if (!formData.nome.trim()) {
      toast.error("Nome é obrigatório");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email é obrigatório");
      return;
    }

    setIsLoading(true);
    try {
      const updatedUser = {
        ...user,
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        foto: formData.foto,
      };

      const result = await updateUser(updatedUser);
      if (result.success) {
        toast.success("Perfil atualizado com sucesso!");
        setIsEditing(false);
      } else {
        toast.error(result.error || "Erro ao atualizar perfil");
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Erro ao atualizar perfil");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      nome: user?.nome || "",
      email: user?.email || "",
      foto: user?.foto || null,
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logout realizado com sucesso!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-lg">
        {/* Header */}
        <div className="profile-header">
          <Link to="/biblioteca" className="back-btn">
            <ArrowLeft size={20} />
            Voltar para Biblioteca
          </Link>
          <h1>Meu Perfil</h1>
        </div>

        <div className="profile-layout">
          {/* Profile Card */}
          <div className="profile-card">
            <div className="profile-photo-section">
              <div className="profile-photo-container">
                {formData.foto ? (
                  <img
                    src={formData.foto}
                    alt="Foto do perfil"
                    className="profile-photo"
                  />
                ) : (
                  <div className="profile-photo-placeholder">
                    <User size={48} />
                  </div>
                )}

                {isEditing && (
                  <div className="photo-actions">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="photo-action-btn"
                      title="Alterar foto"
                    >
                      <Camera size={16} />
                    </button>
                    {formData.foto && (
                      <button
                        onClick={removePhoto}
                        className="photo-action-btn remove"
                        title="Remover foto"
                      >
                        ×
                      </button>
                    )}
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ display: "none" }}
              />

              {!isEditing && !formData.foto && (
                <p className="photo-help">
                  Clique em "Editar" para adicionar uma foto
                </p>
              )}
            </div>

            <div className="profile-info">
              {isEditing ? (
                <div className="profile-form">
                  <div className="form-group">
                    <label htmlFor="nome" className="form-label">
                      Nome
                    </label>
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      placeholder="Seu nome completo"
                      value={formData.nome}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      <Mail size={16} />
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </div>

                  <div className="form-actions">
                    <button
                      onClick={handleCancel}
                      className="btn btn-outline"
                      disabled={isLoading}
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSave}
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      <Save size={16} />
                      {isLoading ? "Salvando..." : "Salvar"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="profile-display">
                  <h2 className="profile-name">{user?.nome}</h2>
                  <p className="profile-email">
                    <Mail size={16} />
                    {user?.email}
                  </p>

                  <div className="profile-actions">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn btn-primary"
                    >
                      Editar Perfil
                    </button>
                    <button onClick={handleLogout} className="btn btn-outline">
                      <LogOut size={16} />
                      Sair da Conta
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats Card */}
          <div className="stats-card">
            <h3>Estatísticas de Leitura</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon">
                  <BookmarkCheck size={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-number">0</span>
                  <span className="stat-label">Quero Ler</span>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon">
                  <BookOpen size={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-number">0</span>
                  <span className="stat-label">Lidos</span>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon">
                  <Heart size={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-number">0</span>
                  <span className="stat-label">Favoritos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="account-card">
            <h3>Informações da Conta</h3>
            <div className="account-info">
              <div className="info-item">
                <label>ID do Usuário</label>
                <span>{user?.id}</span>
              </div>
              <div className="info-item">
                <label>Membro desde</label>
                <span>
                  {new Date(
                    user?.id === "1" ? "2024-01-01" : Date.now(),
                  ).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <div className="info-item">
                <label>Tipo de Conta</label>
                <span>
                  {user?.email === "folium@folium.com" ? "Teste" : "Padrão"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Perfil;
