# 📚 Folium - Sua Biblioteca Pessoal Digital

Uma aplicação web moderna para gerenciar sua biblioteca pessoal, buscar novos livros e organizar suas leituras.


![01](https://github.com/user-attachments/assets/022d8a78-b83c-4b22-b6a4-2b88580b9c29)
![02](https://github.com/user-attachments/assets/d84be44d-4a54-496c-a5c0-1030235f48ae)

## 🚀 Tecnologias Utilizadas

- **React 18** - Interface de usuário
- **JavaScript (ES6+)** - Linguagem principal
- **CSS3** - Estilização e design system
- **React Router** - Navegação
- **Context API** - Gerenciamento de estado
- **Google Books API** - Busca de livros
- **LocalStorage** - Persistência de dados

## ✨ Funcionalidades

### 🔐 Autenticação

- Login e cadastro de usuários
- Sessão persistente entre navegações
- Usuário de teste: `folium@folium.com` / `123456`

### 📖 Biblioteca Pessoal

- **Busca de livros** via Google Books API
- **Filtros avançados** por categoria, idioma e ordenação
- **Três listas personalizadas**:
  - 📑 **Quero Ler** - Livros para ler futuramente
  - ✅ **Lidos** - Livros já concluídos
  - ❤️ **Favoritos** - Livros preferidos

### 👤 Perfil de Usuário

- Edição de dados pessoais
- Upload de foto de perfil
- Estatísticas de leitura em tempo real
- Informações da conta

### 🎨 Interface

- **Design responsivo** - Mobile, tablet e desktop
- **Tema claro/escuro** - Alternância automática
- **Notificações** - Feedback visual das ações
- **Menu adaptativo** - Hamburger no mobile/tablet

## 🏗️ Arquitetura

### Estrutura de Pastas

```
src/
├── components/          # Componentes reutilizáveis
├── contexts/           # Estado global (Context API)
├── pages/              # Páginas da aplicação
├── styles/             # CSS global e design system
├── utils/              # Utilitários e helpers
├── App.js              # Componente raiz
└── index.js            # Ponto de entrada
```

### Gerenciamento de Estado

- **AuthContext** - Autenticação e dados do usuário
- **BookListsContext** - Listas de livros e persistência
- **ThemeContext** - Tema da aplicação

### Persistência de Dados

- **LocalStorage** com sistema de backup automático
- **Sincronização** automática entre dispositivos do mesmo usuário
- **Recuperação** de dados em caso de falhas

## 🔧 Como Usar

### Instalação

```bash
npm install
npm start
```

### Credenciais de Teste

- **Email**: `folium@folium.com`
- **Senha**: `123456`

### Funcionalidades Principais

1. **Fazer Login** - Use as credenciais de teste ou crie uma conta
2. **Buscar Livros** - Digite títulos, autores ou use filtros
3. **Adicionar às Listas** - Clique nos ícones dos cards de livros
4. **Gerenciar Perfil** - Acesse via menu ou botão do usuário
5. **Navegar pelas Listas** - Use as abas na biblioteca

## 📱 Responsividade

### Desktop (>1024px)

- Layout completo com todas as funcionalidades
- Menu horizontal no header
- Grid otimizado para telas grandes

### Tablet (768px - 1024px)

- Menu hambúrguer
- Layout adaptado para touch
- Grid responsivo

### Mobile (<768px)

- Interface otimizada para uma mão
- Menu hambúrguer centralizado
- Cards compactos

## 🎨 Design System

### Cores

- **Modo Claro**: Tons creme e sépia (tema papel antigo)
- **Modo Escuro**: Tons azul escuro e acinzentado
- **Accent**: Verde sálvia (#85a472)

### Tipografia

- **Títulos**: Crimson Text (serif)
- **Corpo**: Inter (sans-serif)
- **Tamanhos**: Sistema modular baseado em rem

### Componentes

- **Cards** - Para livros e informações
- **Botões** - Hierarquia clara (primário, secundário, ícone)
- **Formulários** - Estilizados e acessíveis
- **Toast** - Notificações não-intrusivas

## 🔄 Persistência de Dados

### Sistema Robusto

- **Salvamento automático** a cada alteração
- **Backup redundante** para prevenir perda de dados
- **Recuperação inteligente** em caso de falhas
- **Sincronização** por usuário

### Estrutura dos Dados

```javascript
// Dados do usuário
{
  id: "string",
  nome: "string",
  email: "string",
  foto: "base64_string"
}

// Listas de livros
{
  "quero-ler": [livros],
  "lido": [livros],
  "favorito": [livros]
}
```

## 🐛 Solução de Problemas

### Dados Perdidos

- O sistema possui backup automático
- Dados são restaurados automaticamente ao fazer login
- Em último caso, faça logout e login novamente

### Performance

- Imagens carregadas sob demanda (lazy loading)
- Cache automático das buscas
- Otimização para dispositivos móveis

### Compatibilidade

- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado obrigatório
- LocalStorage suportado

## ��� Licença

Este projeto foi desenvolvido para fins educacionais e demonstração.

---

Link do Folium: https://gerald0juni0r.github.io/folium-library

**Desenvolvido com ❤️ para amantes de livros**

