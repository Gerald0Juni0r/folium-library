import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage
    const usuarioSalvo = localStorage.getItem("folium-usuario");
    if (usuarioSalvo) {
      try {
        setUsuario(JSON.parse(usuarioSalvo));
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        localStorage.removeItem("folium-usuario");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, senha) => {
    try {
      // Simular chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Credenciais de teste específicas
      if (email === "folium@folium.com" && senha === "123456") {
        const usuarioTeste = {
          id: "1",
          nome: "Usuário Teste",
          email: "folium@folium.com",
          foto: null,
        };

        setUsuario(usuarioTeste);
        localStorage.setItem("folium-usuario", JSON.stringify(usuarioTeste));
        return { success: true };
      }

      // Para demonstração, aceitar qualquer outro email/senha válidos
      if (email && senha && senha.length >= 6) {
        const novoUsuario = {
          id: Date.now().toString(),
          nome: email.split("@")[0],
          email: email,
          foto: null,
        };

        setUsuario(novoUsuario);
        localStorage.setItem("folium-usuario", JSON.stringify(novoUsuario));
        return { success: true };
      }

      return { success: false, error: "Email ou senha inválidos" };
    } catch (error) {
      console.error("Erro no login:", error);
      return { success: false, error: "Erro ao fazer login" };
    }
  };

  const cadastrar = async (nome, email, senha) => {
    try {
      // Simular chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (nome && email && senha) {
        const novoUsuario = {
          id: Date.now().toString(),
          nome: nome,
          email: email,
          foto: null,
        };

        setUsuario(novoUsuario);
        localStorage.setItem("folium-usuario", JSON.stringify(novoUsuario));
        return { success: true };
      }

      return { success: false, error: "Dados inválidos" };
    } catch (error) {
      console.error("Erro no cadastro:", error);
      return { success: false, error: "Erro ao criar conta" };
    }
  };

  const updateUsuario = async (dadosAtualizados) => {
    try {
      // Simular chamada de API
      await new Promise((resolve) => setTimeout(resolve, 500));

      setUsuario(dadosAtualizados);
      localStorage.setItem("folium-usuario", JSON.stringify(dadosAtualizados));
      return { success: true };
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return { success: false, error: "Erro ao atualizar perfil" };
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("folium-usuario");
    localStorage.removeItem("folium-listas");
  };

  const value = {
    usuario,
    isLoading,
    login,
    cadastrar,
    updateUsuario,
    logout,
    isAuthenticated: !!usuario,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
