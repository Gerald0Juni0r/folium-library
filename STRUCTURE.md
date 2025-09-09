# Folium - Estrutura do Projeto (Limpa)

## 📁 Organização de Pastas

```
📦 folium-react/
├── 📂 .github/               # GitHub Actions (deploy)
│   └── workflows/
│       └── deploy.yml
├── 📂 public/                # Arquivos públicos
│   ├── index.html           # Template HTML principal
│   ├── manifest.json        # PWA manifest
│   └── favicon.ico          # Ícone da aplicação
├── 📂 src/                  # Código fonte React
│   ├── 📂 components/       # Componentes reutilizáveis
│   │   ├── BookCard.js      # Card para exibir livros
│   │   ├── BookCard.css     # Estilos do BookCard
│   │   ├── Header.js        # Cabeçalho da aplicação
│   │   ├── Header.css       # Estilos do Header
│   │   ├── Icons.js         # Ícones SVG customizados
│   │   ├── Toast.js         # Sistema de notificações
│   │   └── Toast.css        # Estilos do Toast
│   ├── 📂 contexts/         # Contextos React (estado global)
│   │   ├── AuthContext.js   # Gerenciamento de autenticação
│   │   ├── BookListsContext.js # Gerenciamento das listas de livros
│   │   └── ThemeContext.js  # Gerenciamento de tema (claro/escuro)
│   ├── 📂 pages/            # Páginas da aplicação
│   │   ├── LandingPage.js   # Página inicial
│   │   ├── LandingPage.css  # Estilos da Landing Page
│   │   ├── Login.js         # Página de login
│   │   ├── Cadastro.js      # Página de cadastro
│   │   ├── Biblioteca.js    # Página principal da biblioteca
│   │   ├── Biblioteca.css   # Estilos da Biblioteca
│   │   ├── Perfil.js        # Página do perfil do usuário
│   │   ├── Perfil.css       # Estilos do Perfil
│   │   └── NotFound.js      # Página 404
│   ├── 📂 styles/           # Estilos globais
│   │   └── index.css        # CSS global e design system
│   ├── 📂 utils/            # Utilitários e helpers
│   │   └── dataManager.js   # Gerenciamento de dados e backup
│   ├── App.js               # Componente raiz da aplicação
│   └── index.js             # Ponto de entrada da aplicação
├── 📄 .env                  # Variáveis de ambiente
├── 📄 package.json          # Dependências e scripts
├── 📄 README.md             # Documentação principal
└── 📄 STRUCTURE.md          # Este arquivo
```

## 🏗️ Arquitetura Limpa

### 🎯 **Filosofia: Frontend Puro**
- **Zero backend próprio**: Aplicação 100% frontend
- **API externa**: Google Books API para busca
- **Persistência local**: localStorage + sistema de backup
- **Deploy simples**: GitHub Pages

### 🧩 **Padrões Arquiteturais**

#### Context API (Estado Global)
```javascript
📂 contexts/
├── AuthContext.js      # Usuário logado, login/logout
├── BookListsContext.js # Listas de livros (Quero Ler, Lidos, Favoritos)
└── ThemeContext.js     # Tema claro/escuro
```

#### Componentes Reutilizáveis
```javascript
📂 components/
├── BookCard.js    # Exibe livro + ações (adicionar às listas)
├── Header.js      # Navegação + menu mobile/desktop
├── Icons.js       # Biblioteca de ícones SVG
└── Toast.js       # Notificações não-intrusivas
```

#### Páginas com Roteamento
```javascript
📂 pages/
├── LandingPage.js # Página inicial (pública)
├── Login.js       # Autenticação
├── Cadastro.js    # Registro
├── Biblioteca.js  # Busca + listas (protegida)
├── Perfil.js      # Dados do usuário (protegida)
└── NotFound.js    # 404
```

## 💾 **Sistema de Dados**

### localStorage (Chave Principal)
```javascript
"folium-usuario"  → { id, nome, email, foto }
"folium-listas"   → { "quero-ler": [], lido: [], favorito: [] }
"folium-backup"   → { lists, userId, timestamp }
```

### Fluxo de Persistência
```
1. Usuário adiciona livro → BookCard
2. BookCard → BookListsContext.adicionarALista()
3. Context atualiza estado → React re-render
4. useEffect detecta mudança → dataManager.saveLists()
5. Salva em localStorage + backup automático
```

## 🌐 **Integração Externa**

### Google Books API
```javascript
// Busca direta do frontend (sem proxy)
https://www.googleapis.com/books/v1/volumes
?q=${query}
&maxResults=20
&printType=books
&orderBy=${order}
&subject=${category}
&langRestrict=${lang}
```

### Normalização de Dados
```javascript
// Transforma resposta da API para formato interno
{
  id: book.id,
  titulo: book.volumeInfo.title,
  autores: book.volumeInfo.authors,
  capa: book.volumeInfo.imageLinks?.thumbnail,
  // ... etc
}
```

## 🎨 **Design System**

### CSS Custom Properties (Variáveis)
```css
:root {
  /* Modo Claro */
  --bg-primary: #faf8f5;    /* Creme */
  --text-primary: #3d3426;  /* Sépia escuro */
  --accent: #85a472;        /* Verde sálvia */
  
  /* Espaçamentos */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
}
```

### Responsividade
```css
/* Mobile-first */
@media (max-width: 768px)  { /* Mobile */ }
@media (max-width: 1024px) { /* Tablet */ }
@media (min-width: 1025px) { /* Desktop */ }
```

## 🚀 **Scripts de Build**

```json
{
  "start": "react-scripts start",     // Desenvolvimento
  "build": "react-scripts build",     // Produção
  "test": "react-scripts test",       // Testes
  "eject": "react-scripts eject"      // Ejetar CRA
}
```

## 🔒 **Segurança e Performance**

### Dados Locais
- ✅ Não há dados sensíveis no localStorage
- ✅ Backup automático previne perda de dados
- ✅ Limpeza automática no logout

### Otimizações
- ✅ Lazy loading de imagens
- ✅ Componentes funcionais + hooks
- ✅ CSS-in-JS evitado (CSS puro)
- ✅ Bundle otimizado pelo Create React App

## 📝 **Benefícios da Arquitetura Limpa**

1. **Simplicidade**: Zero configuração de servidor
2. **Manutenibilidade**: Código bem organizado e documentado
3. **Performance**: Frontend otimizado + cache local
4. **Deploy**: Um comando (`npm run build`)
5. **Escalabilidade**: Fácil adicionar features ou backend futuro
