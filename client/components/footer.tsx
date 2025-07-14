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
              Discover your next great read with our comprehensive book search
              platform.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-medium text-folium-ink dark:text-folium-cream">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/about"
                  className="text-muted-foreground hover:text-folium-sage transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-muted-foreground hover:text-folium-sage transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/help"
                  className="text-muted-foreground hover:text-folium-sage transition-colors"
                >
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-medium text-folium-ink dark:text-folium-cream">
              Categories
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/fiction"
                  className="text-muted-foreground hover:text-folium-sage transition-colors"
                >
                  Fiction
                </a>
              </li>
              <li>
                <a
                  href="/non-fiction"
                  className="text-muted-foreground hover:text-folium-sage transition-colors"
                >
                  Non-Fiction
                </a>
              </li>
              <li>
                <a
                  href="/science"
                  className="text-muted-foreground hover:text-folium-sage transition-colors"
                >
                  Science
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
                  href="/terms"
                  className="text-muted-foreground hover:text-folium-sage transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-muted-foreground hover:text-folium-sage transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/cookies"
                  className="text-muted-foreground hover:text-folium-sage transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-6 border-folium-silver dark:border-folium-silver/30" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2024 Folium. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 md:mt-0">
            Made with <Heart className="h-4 w-4 text-red-500 fill-current" />{" "}
            for book lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
