# Sistema de Aplicação de Provas de Geografia - Backend API

## Descrição

Backend API para o Sistema de Aplicação de Provas de Geografia para alunos do sexto ano do ensino fundamental 2.

## Tecnologias

- **Runtime**: Node.js
- **Framework**: Express.js
- **Linguagem**: TypeScript
- **Arquitetura**: REST API

## Estrutura do Projeto

```
src/
├── api/                    # API controllers
│   └── v1/                 # API Version 1
│       ├── external/       # Public endpoints
│       └── internal/       # Authenticated endpoints
├── routes/                 # Route definitions
│   └── v1/                 # V1 routes
├── middleware/             # Express middleware
├── services/               # Business logic
├── utils/                  # Utility functions
├── constants/              # Application constants
├── instances/              # Service instances
├── tests/                  # Global test utilities
├── config/                 # Configuration
└── server.ts               # Application entry point
```

## Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Configurar variáveis de ambiente no arquivo .env
```

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm start

# Testes
npm test
npm run test:watch
npm run test:coverage

# Linting
npm run lint
npm run lint:fix
```

## Configuração de Ambiente

Variáveis de ambiente necessárias (ver `.env.example`):

- `NODE_ENV`: Ambiente de execução (development/production)
- `PORT`: Porta do servidor (padrão: 3000)
- `API_VERSION`: Versão da API (padrão: v1)
- `CORS_ORIGINS`: URLs permitidas para CORS

## Estrutura de URLs

```
/health                          # Health check
/api/v1/external/...            # Endpoints públicos
/api/v1/internal/...            # Endpoints autenticados
```

## Padrões de Desenvolvimento

### Nomenclatura

- **Arquivos**: camelCase (ex: `userService.ts`)
- **Diretórios API**: kebab-case (ex: `order-item/`)
- **Funções**: camelCase com verbos (ex: `createOrder`)
- **Constantes**: UPPER_SNAKE_CASE
- **Interfaces/Types**: PascalCase

### Estrutura de Resposta

**Sucesso**:
```json
{
  "success": true,
  "data": {},
  "metadata": {
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

**Erro**:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Testes

- Testes unitários colocados junto aos arquivos fonte (`.test.ts`)
- Testes de integração colocados junto aos arquivos fonte (`Integration.ts`)
- Utilitários de teste compartilhados em `src/tests/`

## Próximos Passos

Esta é a estrutura base do backend. As features serão implementadas seguindo os padrões estabelecidos:

1. Criar controllers em `src/api/v1/internal/[feature]/`
2. Implementar business logic em `src/services/[feature]/`
3. Adicionar rotas em `src/routes/v1/`
4. Criar testes junto aos arquivos fonte

## Licença

ISC