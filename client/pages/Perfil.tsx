import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  User,
  Mail,
  Save,
  Upload,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/components/auth-provider";
import { toast } from "sonner";

const avatarsPredefinidos = [
  "🧑‍💼",
  "👩‍🎓",
  "🧑‍🎨",
  "👨‍💻",
  "👩‍🔬",
  "🧑‍🏫",
  "👨‍📚",
  "👩‍💼",
  "🧑‍🎭",
  "👨‍🎨",
  "👩‍💻",
  "🧑‍🔬",
  "📚",
  "📖",
  "📝",
  "✨",
  "🎯",
  "🚀",
];

export default function Perfil() {
  const navigate = useNavigate();
  const { usuario, updateUsuario } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    nome: usuario?.nome || "",
    email: usuario?.email || "",
  });
  const [fotoAtual, setFotoAtual] = useState<string | null>(
    usuario?.foto || null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [avatarSelecionado, setAvatarSelecionado] = useState<string | null>(
    null,
  );

  const getInitials = (nome: string) => {
    return nome
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("A imagem deve ter no máximo 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFotoAtual(result);
        setAvatarSelecionado(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSelect = (emoji: string) => {
    setAvatarSelecionado(emoji);
    setFotoAtual(null);
  };

  const handleSave = async () => {
    if (!formData.nome.trim()) {
      toast.error("O nome é obrigatório");
      return;
    }

    setIsLoading(true);

    try {
      // Simular chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const dadosAtualizados = {
        ...usuario!,
        nome: formData.nome.trim(),
        foto: avatarSelecionado || fotoAtual || undefined,
      };

      await updateUsuario(dadosAtualizados);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar perfil. Tente novamente.");
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

  if (!usuario) {
    navigate("/login");
    return null;
  }

    return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/biblioteca")}
              className="hover:bg-folium-parchment dark:hover:bg-folium-silver/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl md:text-2xl font-serif font-semibold text-folium-ink dark:text-folium-cream">
                Meu Perfil
              </h1>
              <p className="text-sm text-muted-foreground">
                Gerencie suas informações pessoais
              </p>
            </div>
          </div>
        </div>
      </header>

            {/* Conteúdo Scrollável */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 md:py-8 max-w-2xl min-h-full">
          <Card className="bg-folium-cream dark:bg-folium-steel border-folium-silver dark:border-folium-silver/30">
          <CardHeader>
            <CardTitle className="text-folium-ink dark:text-folium-cream">
              Informações do Perfil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Seção da Foto */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    {fotoAtual ? (
                      <AvatarImage src={fotoAtual} alt="Foto do perfil" />
                    ) : avatarSelecionado ? (
                      <div className="flex items-center justify-center h-full w-full text-4xl bg-folium-sage/10">
                        {avatarSelecionado}
                      </div>
                    ) : (
                      <AvatarFallback className="bg-folium-sage text-white text-2xl">
                        {getInitials(formData.nome)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-background border-folium-silver dark:border-folium-silver/30"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-folium-ink dark:text-folium-cream">
                  Foto do Perfil
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-background hover:bg-folium-parchment dark:hover:bg-folium-silver/20 border-folium-silver dark:border-folium-silver/30"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFotoAtual(null);
                      setAvatarSelecionado(null);
                    }}
                    className="bg-background hover:bg-folium-parchment dark:hover:bg-folium-silver/20 border-folium-silver dark:border-folium-silver/30"
                  >
                    Remover
                  </Button>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Avatars Predefinidos */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-folium-ink dark:text-folium-cream">
                Ou escolha um avatar:
              </Label>
              <div className="grid grid-cols-6 gap-2">
                {avatarsPredefinidos.map((emoji, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    onClick={() => handleAvatarSelect(emoji)}
                    className={`h-12 w-12 text-2xl ${
                      avatarSelecionado === emoji
                        ? "ring-2 ring-folium-sage bg-folium-sage/10"
                        : "bg-background hover:bg-folium-parchment dark:hover:bg-folium-silver/20"
                    } border-folium-silver dark:border-folium-silver/30`}
                  >
                    {emoji}
                    {avatarSelecionado === emoji && (
                      <div className="absolute -top-1 -right-1 h-4 w-4 bg-folium-sage rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            <Separator className="bg-folium-silver dark:bg-folium-silver/30" />

            {/* Informações Pessoais */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="nome"
                  className="text-sm font-medium text-folium-ink dark:text-folium-cream flex items-center"
                >
                  <User className="h-4 w-4 mr-2 text-folium-sage" />
                  Nome Completo
                </Label>
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.nome}
                  onChange={handleChange}
                  className="bg-background border-folium-silver dark:border-folium-silver/30 focus:border-folium-sage dark:focus:border-folium-azure"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-folium-ink dark:text-folium-cream flex items-center"
                >
                  <Mail className="h-4 w-4 mr-2 text-folium-sage" />
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="bg-muted border-folium-silver dark:border-folium-silver/30 cursor-not-allowed"
                />
                <p className="text-xs text-muted-foreground">
                  O email não pode ser alterado
                </p>
              </div>
            </div>

            <Separator className="bg-folium-silver dark:bg-folium-silver/30" />

            {/* Botões de Ação */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={() => navigate("/biblioteca")}
                variant="outline"
                className="flex-1 bg-background hover:bg-folium-parchment dark:hover:bg-folium-silver/20 border-folium-silver dark:border-folium-silver/30"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="flex-1 bg-folium-sage hover:bg-folium-sage/90 text-white"
              >
                {isLoading ? (
                  "Salvando..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}