# Sistema de Provas de Geografia - 6º Ano

Plataforma integrada para aplicação de provas de geografia para alunos do sexto ano do ensino fundamental 2.

## Tecnologias

- React 18.3.1
- TypeScript 5.6.3
- Vite 5.4.11
- TailwindCSS 3.4.14
- React Router DOM 6.26.2
- TanStack Query 5.59.20
- Axios 1.7.7
- Zustand 5.0.1
- React Hook Form 7.53.1
- Zod 3.23.8

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── App.tsx            # Componente raiz
│   └── router.tsx         # Configuração de rotas
├── pages/                 # Páginas da aplicação
│   ├── layouts/          # Layouts compartilhados
│   ├── Home/             # Página inicial
│   └── NotFound/         # Página 404
├── core/                  # Componentes e utilitários globais
│   ├── components/       # Componentes reutilizáveis
│   ├── lib/              # Configurações de bibliotecas
│   └── utils/            # Funções utilitárias
├── domain/               # Domínios de negócio (a serem implementados)
└── assets/               # Recursos estáticos
    └── styles/           # Estilos globais
```

## Configuração

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse a aplicação em: http://localhost:3001

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza build de produção
- `npm run lint` - Executa linter

## Integração com Backend

O frontend está configurado para se comunicar com o backend através de:

- **API Base URL**: http://localhost:3000
- **Endpoints Públicos**: /api/v1/external/*
- **Endpoints Autenticados**: /api/v1/internal/*

## Próximos Passos

Esta é a estrutura base do frontend. Os próximos passos incluem:

1. Implementação de autenticação
2. Criação de domínios de negócio (questões, provas, alunos, etc.)
3. Desenvolvimento de componentes específicos
4. Integração completa com backend
5. Implementação de testes

## Licença

Todos os direitos reservados © 2024