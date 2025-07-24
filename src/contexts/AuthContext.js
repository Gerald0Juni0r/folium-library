import React, { createContext, useContext, useState, useEffect } from "react";

// Context para gerenciar autenticação do usuário
const AuthContext = createContext();

// Hook customizado para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

// Provider de autenticação - gerencia login, logout e estado do usuário
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verifica se há usuário logado salvo no localStorage ao inicializar
  useEffect(() => {
    const userSaved = localStorage.getItem("folium-usuario");
    
    if (userSaved) {
      try {
        // Restaura sessão do usuário
        setUser(JSON.parse(userSaved));
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        // Remove dados corrompidos
        localStorage.removeItem("folium-usuario");
      }
    }
    setIsLoading(false);
  }, []);

  // Função de login - aceita credenciais de teste e outras válidas
  const login = async (email, senha) => {
    try {
      // Simula chamada de API com delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Credenciais específicas para usuário de teste
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

      // Aceita qualquer email/senha válidos para demonstração
      if (email && senha && senha.length >= 6) {
        const newUser = {
          id: Date.now().toString(),
          nome: email.split("@")[0], // Usa parte do email como nome
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

  // Função de cadastro - cria novo usuário
  const cadastrar = async (nome, email, senha) => {
    try {
      // Simula chamada de API
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

  // Atualiza dados do usuário (usado no perfil)
  const updateUser = async (updatedData) => {
    try {
      // Simula chamada de API
      await new Promise((resolve) => setTimeout(resolve, 500));

      setUser(updatedData);
      localStorage.setItem("folium-usuario", JSON.stringify(updatedData));
      return { success: true };
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return { success: false, error: "Erro ao atualizar perfil" };
    }
  };

  // Função de logout - limpa estado e localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("folium-usuario");
    localStorage.removeItem("folium-listas"); // Limpa também as listas
  };

  // Estado e funções disponíveis para componentes filhos
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
