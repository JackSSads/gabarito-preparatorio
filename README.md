# Gabarito Preparatório

Uma aplicação web de preparação para provas da Marinha Mercante, construída com React, TypeScript e Vite. O sistema oferece questões autênticas, simulados cronometrados e ranking competitivo.

## 🚀 Tecnologias

### Frontend
- **React 18** - Biblioteca principal de UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **React Router DOM** - Gerenciamento de rotas
- **TanStack Query** - Gerenciamento de estado e cache de API

### UI & Styling
- **Tailwind CSS** - Framework de estilização
- **shadcn/ui** - Componentes UI reutilizáveis
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones
- **next-themes** - Gerenciamento de temas

### Forms & Validation
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **@hookform/resolvers** - Integração com Zod

### HTTP & Data
- **Axios** - Cliente HTTP
- **Recharts** - Gráficos e visualizações

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes UI (shadcn/ui)
│   ├── Navbar.tsx      # Barra de navegação
│   └── Footer.tsx      # Rodapé
├── pages/              # Páginas da aplicação
│   ├── Index.tsx       # Página inicial
│   ├── Login.tsx       # Login
│   ├── Register.tsx    # Registro
│   ├── Quiz.tsx        # Quiz/simulado
│   ├── QuizConfigPage.tsx # Configuração do quiz
│   ├── Results.tsx     # Resultados
│   ├── Ranking.tsx     # Ranking de usuários
│   ├── Admin.tsx       # Painel administrativo
│   └── NotFound.tsx    # Página 404
├── services/           # Serviços de API
│   ├── AuthService/    # Autenticação
│   ├── Question/       # Gestão de questões
│   ├── QuestionAnswer/ # Respostas
│   ├── Ranking/        # Ranking
│   ├── User/           # Usuários
│   └── axiosConfig/    # Configuração HTTP
├── types/              # Tipos TypeScript
│   ├── auth.ts         # Tipos de autenticação
│   ├── questions.ts    # Tipos de questões
│   ├── quizConfig.ts   # Configuração de quiz
│   ├── ranking.ts      # Ranking
│   └── user.ts         # Usuário
├── hooks/              # Hooks personalizados
├── lib/                # Utilitários
├── data/               # Dados estáticos
└── router/             # Configuração de rotas
```

## 🎯 Funcionalidades

### Para Alunos
- **Quiz Personalizado**: Configure tempo, dificuldade e matéria
- **Simulados Cronometrados**: Treine em condições reais
- **Questões Autênticas**: Baseadas em provas da Marinha Mercante
- **Ranking Competitivo**: Compare seu desempenho
- **Histórico de Resultados**: Acompanhe sua evolução

### Para Administradores
- **Gestão de Questões**: Adicione, edite e remova perguntas
- **Controle de Usuários**: Gerencie contas e permissões
- **Análise de Desempenho**: Visualize estatísticas

### Tipos de Questões
- **Matérias**: Português (POR) e Matemática (MAT)
- **Dificuldades**: Fácil, Médio e Difícil
- **Formato**: Múltipla escolha com 4 opções

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Passos

1. **Clone o repositório**
```bash
git clone <repository-url>
cd gabarito-preparatorio
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

5. **Acesse a aplicação**
```
http://localhost:5173
```

## 📝 Variáveis de Ambiente

```env
VITE_API_URL=http://localhost:5000  # URL da API backend
```

## 🚀 Build e Deploy

### Build para Produção
```bash
npm run build
# ou
yarn build
```

### Preview do Build
```bash
npm run preview
# ou
yarn preview
```

### Deploy na Vercel
O projeto está configurado para deploy na Vercel através do arquivo `vercel.json`.

## 🧪 Lint e Code Quality

```bash
# Verificar lint
npm run lint

# Corrigir automaticamente
npm run lint -- --fix
```

## 🔧 Configurações

### TypeScript
- Configuração em `tsconfig.json`
- Tipagem estrita habilitada
- Suporte a paths absolutos com `@/`

### ESLint
- Configuração em `eslint.config.js`
- Regras para React e TypeScript
- Integração com hooks do React

### Tailwind CSS
- Configuração em `tailwind.config.ts`
- Tema customizado com cores primárias
- Suporte a dark mode

## 📊 API Integration

A aplicação se comunica com uma API backend através dos seguintes endpoints:

### Autenticação
- `POST /auth/login` - Login de usuário
- `POST /auth/register` - Registro de usuário
- `POST /auth/logout` - Logout

### Questões
- `GET /questions` - Listar questões
- `POST /questions` - Criar questão
- `PUT /questions/:id` - Atualizar questão
- `DELETE /questions/:id` - Remover questão

### Quiz e Resultados
- `POST /quiz/start` - Iniciar quiz
- `POST /quiz/submit` - Enviar respostas
- `GET /results/:userId` - Histórico de resultados

### Ranking
- `GET /ranking` - Ranking geral
- `GET /ranking/:subject` - Ranking por matéria

## 🎨 Componentes UI

O projeto utiliza shadcn/ui como base para componentes reutilizáveis:

- **Button**: Botões com variantes e tamanhos
- **Card**: Cards para conteúdo
- **Input**: Campos de entrada
- **Select**: Seletores dropdown
- **Dialog**: Modais e diálogos
- **Toast**: Notificações
- **Form**: Formulários com validação

## 🔄 Fluxo da Aplicação

1. **Página Inicial**: Apresentação e navegação
2. **Autenticação**: Login ou registro
3. **Configuração do Quiz**: Escolha de parâmetros
4. **Realização do Quiz**: Questões com cronômetro
5. **Resultados**: Visualização do desempenho
6. **Ranking**: Comparação com outros usuários

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🆘 Suporte

Para suporte ou dúvidas:
- Abra uma issue no GitHub
- Entre em contato com a equipe de desenvolvimento