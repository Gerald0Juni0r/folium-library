import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/components/auth-provider";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const sucesso = await login(formData.email, formData.senha);
      if (sucesso) {
        toast.success("Login realizado com sucesso!");
        navigate("/biblioteca");
      } else {
        toast.error("Email ou senha inválidos");
      }
    } catch (error) {
      toast.error("Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-folium-sage text-white">
              <BookOpen className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-serif font-semibold text-folium-ink dark:text-folium-cream">
              Folium
            </h1>
          </div>
          <p className="text-muted-foreground">
            Entre na sua conta para descobrir novos livros
          </p>
        </div>

        {/* Credenciais de Teste */}
        <div className="bg-folium-azure/10 border border-folium-azure/20 rounded-lg p-4">
          <h3 className="font-medium text-folium-ink dark:text-folium-cream mb-2 flex items-center">
            🧪 Credenciais de Teste
          </h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>
              <strong>Email:</strong> folium@folium.com
            </p>
            <p>
              <strong>Senha:</strong> 123456
            </p>
          </div>
          <Button
            onClick={() => {
              setFormData({ email: "folium@folium.com", senha: "123456" });
            }}
            variant="outline"
            size="sm"
            className="mt-2 w-full text-xs bg-background hover:bg-folium-azure/10 border-folium-azure/30"
          >
            Preencher Automaticamente
          </Button>
        </div>

        {/* Formulário */}
        <Card className="bg-folium-cream dark:bg-folium-steel border-folium-silver dark:border-folium-silver/30">
          <CardHeader>
            <CardTitle className="text-center text-folium-ink dark:text-folium-cream">
              Entrar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-folium-ink dark:text-folium-cream"
                >
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-background border-folium-silver dark:border-folium-silver/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="senha"
                  className="text-folium-ink dark:text-folium-cream"
                >
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="senha"
                    name="senha"
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="Sua senha"
                    value={formData.senha}
                    onChange={handleChange}
                    required
                    className="pl-10 pr-10 bg-background border-folium-silver dark:border-folium-silver/30"
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {mostrarSenha ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-folium-sage hover:bg-folium-sage/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Não tem uma conta?{" "}
                <Link
                  to="/cadastro"
                  className="text-folium-sage hover:text-folium-sage/80 font-medium"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-folium-sage"
          >
            ← Voltar para página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
