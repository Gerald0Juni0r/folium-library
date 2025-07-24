# Folium - Estrutura do Projeto

## 📁 Organização de Pastas

```
src/
├── components/          # Componentes reutilizáveis
│   ├── BookCard.js     # Card para exibir livros
│   ├── Header.js       # Cabeçalho da aplicação
│   ├── Icons.js        # Ícones SVG customizados
│   └── Toast.js        # Sistema de notificações
├── contexts/           # Contextos React (estado global)
│   ├── AuthContext.js  # Gerenciamento de autenticação
│   ├── BookListsContext.js # Gerenciamento das listas de livros
│   └── ThemeContext.js # Gerenciamento de tema (claro/escuro)
├── pages/              # Páginas da aplicação
│   ├── LandingPage.js  # Página inicial
│   ├── Login.js        # Página de login
│   ├── Cadastro.js     # Página de cadastro
│   ├── Biblioteca.js   # Página principal da biblioteca
│   ├── Perfil.js       # Página do perfil do usuário
│   └── NotFound.js     # Página 404
├── styles/             # Estilos globais
│   └── index.css       # CSS global e design system
├── App.js              # Componente raiz da aplicação
└── index.js            # Ponto de entrada da aplicação
```

## 🔧 Funcionalidades Principais

### 1. Sistema de Autenticação
- **LocalStorage**: Persiste sessão do usuário
- **Credenciais de teste**: folium@folium.com / 123456
- **Auto-login**: Mantém usuário logado entre sessões

### 2. Gerenciamento de Listas
- **Três listas**: Quero Ler, Lidos, Favoritos
- **Persistência automática**: Salva no localStorage a cada mudança
- **Sincronização**: Carrega listas salvas ao fazer login

### 3. Integração com Google Books API
- **Busca de livros**: Por título, autor, categoria
- **Filtros**: Categoria, idioma, ordenação
- **Dados normalizados**: Compatível com diferentes formatos da API

## 🏗️ Arquitetura

### Context API
- **AuthContext**: Gerencia estado de autenticação
- **BookListsContext**: Gerencia listas de livros
- **ThemeContext**: Gerencia tema da aplicação

### Persistência de Dados
- **localStorage keys**:
  - `folium-usuario`: Dados do usuário logado
  - `folium-listas`: Listas de livros do usuário

### Responsividade
- **Mobile-first**: Design responsivo
- **Breakpoints**: 768px, 1024px
- **Menu adaptativo**: Hambúrguer no mobile/tablet

## 🎨 Design System

### Cores (CSS Custom Properties)
- **Light mode**: Tons de creme e sépia
- **Dark mode**: Tons de azul escuro
- **Accent**: Verde sálvia (#85a472)

### Componentes
- **Cards**: Para livros e informações
- **Botões**: Primário, secundário, ícone
- **Formulários**: Estilizados e acessíveis
- **Toast**: Notificações não-intrusivas

## 🔄 Fluxo de Dados

1. **Login** → Carrega dados do localStorage
2. **Busca** → API Google Books → Normalização → Exibição
3. **Adicionar livro** → Atualiza estado → Salva localStorage
4. **Navegação** → Roteamento protegido
5. **Logout** → Limpa estado e localStorage
