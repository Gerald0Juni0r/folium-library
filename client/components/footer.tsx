import { BookOpen, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-folium-cream dark:bg-folium-steel mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
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
              Descubra sua próxima grande leitura com nossa plataforma
              abrangente de busca de livros.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-3">
            <h4 className="font-medium text-folium-ink dark:text-folium-cream">
              Links Rápidos
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/sobre"
                  className="text-muted-foreground hover:text-folium-sage transition-colors"
                >
                  Sobre Nós
                </a>
              </li>
              <li>
                <a
                  href="/contato"
                  className="text-muted-foreground hover:text-folium-sage transition-colors"
                >
                  Contato
                </a>
              </li>
              <li>
                <a
                  href="/ajuda"
                  className="text-muted-foreground hover:text-folium-sage transition-colors"
                >
                  Central de Ajuda
                </a>
              </li>
            </ul>
          </div>

          {/* Categorias */}
          <div className="space-y-3">
            <h4 className="font-medium text-folium-ink dark:text-folium-cream">
              Categorias
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/ficcao"
                  className="text-muted-foreground hover:text-folium-sage transition-colors"
                >
                  Ficção
                </a>
              </li>
              <li>
                <a
                  href="/nao-ficcao"
                  className="text-muted-foreground hover:text-folium-sage transition-colors"
                >
                  Não-ficção
                </a>
              </li>
              <li>
                <a
                  href="/ciencia"
                  className="text-muted-foreground hover:text-folium-sage transition-colors"
                >
                  Ciência
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="font-medium text-folium-ink dark:text-folium-cream">
              Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/termos"
                  className="text-muted-foreground hover:text-folium-sage transition-colors"
                >
                  Termos de Serviço
                </a>
              </li>
              <li>
                <a
                  href="/privacidade"
                  className="text-muted-foreground hover:text-folium-sage transition-colors"
                >
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a
                  href="/cookies"
                  className="text-muted-foreground hover:text-folium-sage transition-colors"
                >
                  Política de Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-6 border-folium-silver dark:border-folium-silver/30" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2024 Folium. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1 mt-2 md:mt-0">
            Feito com <Heart className="h-4 w-4 text-red-500 fill-current" />{" "}
            para amantes de livros
          </p>
        </div>
      </div>
    </footer>
  );
}
