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
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage
    const userSaved = localStorage.getItem("folium-usuario");
    if (userSaved) {
      try {
        setUser(JSON.parse(userSaved));
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
        const testUser = {
          id: "1",
          nome: "Usuário Teste",
          email: "folium@folium.com",
          foto: null,
        };

        setUser(testUser);
        localStorage.setItem("folium-usuario", JSON.stringify(testUser));
        return { success: true };
      }

      // Para demonstração, aceitar qualquer outro email/senha válidos
      if (email && senha && senha.length >= 6) {
        const newUser = {
          id: Date.now().toString(),
          nome: email.split("@")[0],
          email: email,
          foto: null,
        };

        setUser(newUser);
        localStorage.setItem("folium-usuario", JSON.stringify(newUser));
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
        const newUser = {
          id: Date.now().toString(),
          nome: nome,
          email: email,
          foto: null,
        };

        setUser(newUser);
        localStorage.setItem("folium-usuario", JSON.stringify(newUser));
        return { success: true };
      }

      return { success: false, error: "Dados inválidos" };
    } catch (error) {
      console.error("Erro no cadastro:", error);
      return { success: false, error: "Erro ao criar conta" };
    }
  };

  const updateUser = async (updatedData) => {
    try {
      // Simular chamada de API
      await new Promise((resolve) => setTimeout(resolve, 500));

      setUser(updatedData);
      localStorage.setItem("folium-usuario", JSON.stringify(updatedData));
      return { success: true };
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return { success: false, error: "Erro ao atualizar perfil" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("folium-usuario");
    localStorage.removeItem("folium-listas");
  };

  const value = {
    user,
    isLoading,
    login,
    cadastrar,
    updateUser,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
