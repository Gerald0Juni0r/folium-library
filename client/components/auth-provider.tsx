import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  nome: string;
  email: string;
  foto?: string;
}

interface AuthContextType {
  usuario: User | null;
  isLoading: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  cadastrar: (nome: string, email: string, senha: string) => Promise<boolean>;
  updateUsuario: (dadosAtualizados: User) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<User | null>(null);
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

  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      // Simular uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Credenciais de teste específicas
      if (email === "folium@folium.com" && senha === "123456") {
        const usuarioTeste: User = {
          id: "1",
          nome: "Usuário Teste",
          email: "folium@folium.com",
        };

        setUsuario(usuarioTeste);
        localStorage.setItem("folium-usuario", JSON.stringify(usuarioTeste));
        return true;
      }

      // Para demonstração, aceitar qualquer outro email/senha válidos
      if (email && senha && senha.length >= 6) {
        const novoUsuario: User = {
          id: Date.now().toString(),
          nome: email.split("@")[0],
          email: email,
        };

        setUsuario(novoUsuario);
        localStorage.setItem("folium-usuario", JSON.stringify(novoUsuario));
        return true;
      }

      return false;
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    }
  };

  const cadastrar = async (
    nome: string,
    email: string,
    senha: string,
  ): Promise<boolean> => {
    try {
      // Simular uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Para demonstração, aceitar qualquer dados válidos
      if (nome && email && senha) {
        const novoUsuario: User = {
          id: Date.now().toString(),
          nome: nome,
          email: email,
        };

        setUsuario(novoUsuario);
        localStorage.setItem("folium-usuario", JSON.stringify(novoUsuario));
        return true;
      }

      return false;
    } catch (error) {
      console.error("Erro no cadastro:", error);
      return false;
    }
  };

  const updateUsuario = async (dadosAtualizados: User): Promise<boolean> => {
    try {
      // Simular uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 500));

      setUsuario(dadosAtualizados);
      localStorage.setItem("folium-usuario", JSON.stringify(dadosAtualizados));
      return true;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return false;
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("folium-usuario");
    localStorage.removeItem("folium-listas");
  };

  return (
    <AuthContext.Provider
      value={{ usuario, isLoading, login, cadastrar, updateUsuario, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
