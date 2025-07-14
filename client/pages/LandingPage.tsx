import { Link } from "react-router-dom";
import {
  BookOpen,
  Search,
  Heart,
  Star,
  Users,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-folium-sage text-white">
                <BookOpen className="h-5 w-5" />
              </div>
              <h1 className="text-2xl font-serif font-semibold text-folium-ink dark:text-folium-cream">
                Folium
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="text-folium-ink dark:text-folium-cream hover:bg-folium-parchment dark:hover:bg-folium-silver/20"
                >
                  Entrar
                </Button>
              </Link>
              <Link to="/cadastro">
                <Button className="bg-folium-sage hover:bg-folium-sage/90 text-white">
                  Criar conta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-folium-sage/10 dark:bg-folium-sage/20 mb-6">
              <BookOpen className="h-10 w-10 text-folium-sage" />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-folium-ink dark:text-folium-cream mb-6 leading-tight">
              Organize sua
              <br />
              <span className="text-folium-sage">biblioteca pessoal</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Descubra novos livros, organize suas leituras e mantenha o
              controle do que você já leu, quer ler e dos seus favoritos.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/cadastro">
              <Button
                size="lg"
                className="bg-folium-sage hover:bg-folium-sage/90 text-white px-8 py-3 text-lg"
              >
                Começar agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-folium-silver dark:border-folium-silver/30 px-8 py-3 text-lg"
              >
                Já tenho conta
              </Button>
            </Link>
          </div>

          {/* Preview Image Placeholder */}
          <div className="rounded-2xl bg-folium-parchment dark:bg-folium-steel border border-folium-silver dark:border-folium-silver/30 p-8 max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-folium-sage/20 to-folium-azure/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BookOpen className="h-16 w-16 text-folium-sage mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Interface da biblioteca (visível após login)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-folium-cream/50 dark:bg-folium-steel/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-folium-ink dark:text-folium-cream mb-4">
              Recursos principais
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa para organizar e descobrir livros incríveis
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-background border-folium-silver dark:border-folium-silver/30">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-folium-sage/10 text-folium-sage mb-4">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3 text-folium-ink dark:text-folium-cream">
                  Busca Inteligente
                </h3>
                <p className="text-muted-foreground">
                  Encontre livros por título, autor ou categoria usando nossa
                  busca avançada com filtros.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background border-folium-silver dark:border-folium-silver/30">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-folium-azure/10 text-folium-azure mb-4">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3 text-folium-ink dark:text-folium-cream">
                  Listas Personalizadas
                </h3>
                <p className="text-muted-foreground">
                  Organize seus livros em "Quero Ler", "Lido" e "Favoritos" para
                  um controle completo.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background border-folium-silver dark:border-folium-silver/30">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-folium-sage/10 text-folium-sage mb-4">
                  <Star className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3 text-folium-ink dark:text-folium-cream">
                  Descoberta
                </h3>
                <p className="text-muted-foreground">
                  Descubra novos livros com avaliações, sinopses e informações
                  detalhadas de cada obra.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-folium-ink dark:text-folium-cream mb-6">
                Por que escolher o Folium?
              </h2>
              <div className="space-y-4">
                {[
                  "Interface limpa e intuitiva",
                  "Busca rápida e precisa",
                  "Organização por categorias",
                  "Acompanhamento de progresso",
                  "Modo escuro/claro",
                  "Acesso gratuito",
                ].map((beneficio, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-folium-sage flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-muted-foreground">{beneficio}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:text-center">
              <div className="inline-block p-8 bg-folium-sage/5 dark:bg-folium-sage/10 rounded-2xl">
                <Users className="h-24 w-24 text-folium-sage mx-auto mb-4" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-folium-ink dark:text-folium-cream">
                    1000+
                  </div>
                  <div className="text-muted-foreground">
                    Leitores organizados
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-folium-sage text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Pronto para organizar sua biblioteca?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Comece agora mesmo e descubra uma nova forma de gerenciar suas
            leituras.
          </p>
          <Link to="/cadastro">
            <Button
              size="lg"
              className="bg-white text-folium-sage hover:bg-white/90 px-8 py-3 text-lg font-semibold"
            >
              Criar conta grátis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-folium-cream dark:bg-folium-steel py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-folium-sage text-white">
                  <BookOpen className="h-4 w-4" />
                </div>
                <h3 className="font-serif font-semibold text-lg text-folium-ink dark:text-folium-cream">
                  Folium
                </h3>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Sua biblioteca pessoal digital. Organize, descubra e acompanhe
                suas leituras.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-folium-ink dark:text-folium-cream">
                Produto
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/funcionalidades"
                    className="text-muted-foreground hover:text-folium-sage"
                  >
                    Funcionalidades
                  </Link>
                </li>
                <li>
                  <Link
                    to="/preco"
                    className="text-muted-foreground hover:text-folium-sage"
                  >
                    Preços
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-folium-ink dark:text-folium-cream">
                Empresa
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/sobre"
                    className="text-muted-foreground hover:text-folium-sage"
                  >
                    Sobre nós
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contato"
                    className="text-muted-foreground hover:text-folium-sage"
                  >
                    Contato
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-folium-ink dark:text-folium-cream">
                Legal
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/termos"
                    className="text-muted-foreground hover:text-folium-sage"
                  >
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacidade"
                    className="text-muted-foreground hover:text-folium-sage"
                  >
                    Privacidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <hr className="my-8 border-folium-silver dark:border-folium-silver/30" />

          <div className="text-center text-sm text-muted-foreground">
            © 2024 Folium. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
