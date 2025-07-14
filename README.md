# 📚 Folium - Sua Biblioteca Pessoal Digital

<div align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-6.2.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/TailwindCSS-3.4.11-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/Express.js-4.18.2-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
</div>

<div align="center">
  <h3>🌟 Descubra, organize e acompanhe suas leituras de forma elegante</h3>
  <p>Uma plataforma moderna para gerenciar sua biblioteca pessoal com integração à API do Google Books</p>
</div>

---

## 🚀 **Demonstração**

**🔗 [Acesse o Folium](https://seu-usuario.github.io/folium)**

### 🧪 **Credenciais de Teste**

- **Email:** `folium@folium.com`
- **Senha:** `123456`

---

## ✨ **Principais Funcionalidades**

### 🔐 **Autenticação Completa**

- Sistema de login e cadastro
- Proteção de rotas
- Persistência de sessão
- Gerenciamento de perfil com upload de foto

### 📖 **Busca e Descoberta**

- Busca em tempo real via Google Books API
- Filtros avançados (categoria, idioma, data de publicação)
- Visualização detalhada de livros com capas, sinopses e avaliações
- Interface responsiva e intuitiva

### 📋 **Sistema de Listas Personalizadas**

- **Quero Ler** - Livros para ler futuramente
- **Lido** - Livros já concluídos
- **Favoritos** - Seus livros preferidos
- Navegação entre listas com contadores em tempo real

### 🎨 **Design e Experiência**

- **Tema Dual:** Modo claro (papel antigo) e escuro (azul profundo)
- **Responsivo:** Adaptado para desktop, tablet e mobile
- **Menu Sanduíche:** Navegação elegante em dispositivos móveis
- **Animações Suaves:** Transições e micro-interações polidas

---

## 🛠️ **Tecnologias Utilizadas**

### **Frontend**

| Tecnologia          | Versão   | Descrição                                   |
| ------------------- | -------- | ------------------------------------------- |
| **React**           | 18.3.1   | Biblioteca para interfaces de usuário       |
| **TypeScript**      | 5.5.3    | Superset do JavaScript com tipagem estática |
| **Vite**            | 6.2.2    | Build tool ultrarrápida                     |
| **React Router**    | 6.26.2   | Roteamento SPA                              |
| **TailwindCSS**     | 3.4.11   | Framework CSS utility-first                 |
| **Radix UI**        | Diversos | Componentes acessíveis headless             |
| **Lucide React**    | 0.462.0  | Biblioteca de ícones moderna                |
| **Framer Motion**   | 12.6.2   | Animações e transições                      |
| **React Hook Form** | 7.53.0   | Gerenciamento de formulários                |
| **Sonner**          | 1.5.0    | Toast notifications elegantes               |
| **TanStack Query**  | 5.56.2   | Gerenciamento de estado servidor            |

### **Backend**

| Tecnologia           | Versão | Descrição                                     |
| -------------------- | ------ | --------------------------------------------- |
| **Express.js**       | 4.18.2 | Framework web para Node.js                    |
| **Node.js**          | Latest | Runtime JavaScript                            |
| **CORS**             | 2.8.5  | Middleware para Cross-Origin Resource Sharing |
| **Google Books API** | v1     | API para busca de livros                      |

### **Desenvolvimento**

| Ferramenta       | Versão  | Descrição                     |
| ---------------- | ------- | ----------------------------- |
| **ESLint**       | -       | Linting e qualidade de código |
| **Prettier**     | 3.5.3   | Formatação automática         |
| **PostCSS**      | 8.5.6   | Processamento de CSS          |
| **Autoprefixer** | 10.4.21 | Prefixos CSS automáticos      |

---

## 🏗️ **Arquitetura do Projeto**

```
folium/
├── 📁 client/                    # Frontend React
│   ├── 📁 components/            # Componentes reutilizáveis
│   │   ├── 📁 ui/                # Sistema de design (Radix UI)
│   │   ├── auth-provider.tsx     # Contexto de autenticação
│   │   ├── book-lists-provider.tsx # Gerenciamento de listas
│   │   ├── theme-provider.tsx    # Sistema de temas
│   │   └── ...                   # Outros componentes
│   ├── 📁 pages/                 # Páginas da aplicação
│   │   ├── LandingPage.tsx       # Página inicial
│   │   ├── Login.tsx             # Autenticação
│   │   ├── Biblioteca.tsx        # Dashboard principal
│   │   ├── Perfil.tsx            # Gerenciamento do perfil
│   │   └── ...
│   ├── 📁 lib/                   # Utilitários
│   ├── App.tsx                   # Componente raiz
│   └── global.css                # Estilos globais e temas
├── 📁 server/                    # Backend Express
│   ├── 📁 routes/                # Rotas da API
│   │   ├── books.ts              # Integração Google Books
│   │   └── ...
│   └── index.ts                  # Servidor principal
├── 📁 shared/                    # Types compartilhados
└── 📄 README.md                  # Documentação
```

---

## 🚀 **Como Executar Localmente**

### **Pré-requisitos**

- Node.js 18+
- npm ou yarn

### **Instalação**

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/folium.git
cd folium

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

### **Scripts Disponíveis**

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run typecheck    # Verificação de tipos
npm test             # Executar testes
npm run format.fix   # Formatar código
```

**🌐 Acesse:** `http://localhost:8080`

---

## 🚀 **Deploy no GitHub Pages**

### **Configuração Automática**

1. Fork este repositório
2. Vá em **Settings** → **Pages**
3. Configure **Source** como **GitHub Actions**
4. O deploy será automático a cada push na branch `main`

### **Build Manual**

```bash
# Build da aplicação
npm run build

# Deploy para GitHub Pages
npm run deploy
```

---

## 🎨 **Design System**

### **Paleta de Cores**

- **Modo Claro:** Inspirado em papel antigo com tons quentes
- **Modo Escuro:** Azuis profundos com alto contraste

### **Tipografia**

- **Títulos:** Crimson Text (serifada elegante)
- **Corpo:** Inter (sans-serif moderna)

### **Componentes**

- Sistema baseado em Radix UI
- Totalmente acessível (ARIA)
- Tokens de design consistentes

---

## 📱 **Recursos Responsivos**

### **Breakpoints**

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

### **Funcionalidades Mobile**

- Menu sanduíche elegante
- Busca otimizada para touch
- Cards adaptáveis
- Navegação por gestos

---

## 🔧 **Configuração Avançada**

### **Variáveis de Ambiente**

```env
# API Configuration
GOOGLE_BOOKS_API_KEY=sua_chave_aqui
VITE_API_URL=http://localhost:8080

# App Configuration
VITE_APP_NAME=Folium
VITE_APP_VERSION=1.0.0
```

### **Personalizações**

- Temas customizáveis via CSS variables
- Componentes modulares e extensíveis
- API endpoints configuráveis

---

## 🤝 **Como Contribuir**

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/MinhaFeature`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. **Push** para a branch (`git push origin feature/MinhaFeature`)
5. Abra um **Pull Request**

### **Padrões de Código**

- TypeScript obrigatório
- Componentes funcionais com hooks
- Testes para novas funcionalidades
- Documentação atualizada

---

## 📄 **Licença**

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 **Autor**

**Desenvolvido com ❤️ para amantes de livros**

- 📧 **Email:** seu-email@exemplo.com
- 🐙 **GitHub:** [@seu-usuario](https://github.com/seu-usuario)
- 💼 **LinkedIn:** [Seu Nome](https://linkedin.com/in/seu-perfil)

---

## 🌟 **Roadmap Futuro**

- [ ] 📊 **Analytics de leitura** (páginas lidas, tempo de leitura)
- [ ] 🤝 **Sistema social** (compartilhar listas, seguir amigos)
- [ ] 📝 **Resenhas e notas** pessoais
- [ ] 🔔 **Notificações** de lançamentos
- [ ] 📱 **Aplicativo mobile** nativo
- [ ] 🌐 **Suporte a múltiplos idiomas**
- [ ] 🎯 **Recomendações personalizadas** com IA
- [ ] 📚 **Integração com outras APIs** (Goodreads, OpenLibrary)

---

<div align="center">
  <p><strong>⭐ Se gostou do projeto, não esqueça de dar uma estrela!</strong></p>
  <p>📚 <em>"Um livro é um sonho que você segura em suas mãos"</em> 📚</p>
</div>
