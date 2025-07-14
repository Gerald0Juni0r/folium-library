import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/components/auth-provider";
import { toast } from "sonner";

export default function Cadastro() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (formData.senha.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setIsLoading(true);

    try {
      const sucesso = await cadastrar(
        formData.nome,
        formData.email,
        formData.senha,
      );
      if (sucesso) {
        toast.success("Conta criada com sucesso!");
        navigate("/biblioteca");
      } else {
        toast.error("Erro ao criar conta. Tente novamente.");
      }
    } catch (error) {
      toast.error("Erro ao criar conta. Tente novamente.");
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
            Crie sua conta e comece a organizar sua biblioteca
          </p>
        </div>

        {/* Aviso de Teste */}
        <div className="bg-folium-azure/10 border border-folium-azure/20 rounded-lg p-4">
          <h3 className="font-medium text-folium-ink dark:text-folium-cream mb-2 flex items-center">
            💡 Dica de Teste
          </h3>
          <p className="text-sm text-muted-foreground">
            Já existe uma conta de teste? Use <strong>folium@folium.com</strong>{" "}
            na página de login.
          </p>
        </div>

        {/* Formulário */}
        <Card className="bg-folium-cream dark:bg-folium-steel border-folium-silver dark:border-folium-silver/30">
          <CardHeader>
            <CardTitle className="text-center text-folium-ink dark:text-folium-cream">
              Criar Conta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="nome"
                  className="text-folium-ink dark:text-folium-cream"
                >
                  Nome completo
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder="Seu nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-background border-folium-silver dark:border-folium-silver/30"
                  />
                </div>
              </div>

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
                    placeholder="Mínimo 6 caracteres"
                    value={formData.senha}
                    onChange={handleChange}
                    required
                    minLength={6}
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

              <div className="space-y-2">
                <Label
                  htmlFor="confirmarSenha"
                  className="text-folium-ink dark:text-folium-cream"
                >
                  Confirmar senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmarSenha"
                    name="confirmarSenha"
                    type="password"
                    placeholder="Confirme sua senha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-background border-folium-silver dark:border-folium-silver/30"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-folium-sage hover:bg-folium-sage/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Criando conta..." : "Criar conta"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <Link
                  to="/login"
                  className="text-folium-sage hover:text-folium-sage/80 font-medium"
                >
                  Entre aqui
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
