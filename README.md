# NestJS API

API RESTful desenvolvida com NestJS, implementando uma arquitetura limpa e seguindo os princípios SOLID.

## 🏗️ Estrutura do Projeto

```
src/
├── common/                 # Código compartilhado entre módulos
│   ├── decorators/        # Decoradores personalizados
│   ├── dtos/             # DTOs compartilhados
│   ├── filters/          # Filtros de exceção
│   ├── guards/           # Guards de autenticação
│   ├── interfaces/       # Interfaces compartilhadas
│   └── utils/            # Utilitários
│
├── config/               # Configurações da aplicação
│   ├── database.config.ts
│   ├── jwt.config.ts
│   ├── swagger.config.ts
│   ├── pokeApi.config.ts
│   └── viaCepApi.config.ts
│
├── modules/             # Módulos da aplicação
│   ├── auth/           # Autenticação
│   ├── users/          # Gerenciamento de usuários
│   ├── products/       # Gerenciamento de produtos
│   ├── categories/     # Gerenciamento de categorias
│   ├── addresses/      # Gerenciamento de endereços
│   └── integrations/   # Integrações externas
│       ├── cep/        # Integração com ViaCEP
│       └── pokemon/    # Integração com PokeAPI
│
└── main.ts             # Ponto de entrada da aplicação
```

## 🚀 Tecnologias Utilizadas

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- JWT Authentication
- Swagger/OpenAPI
- Docker
- Jest (Testes)
- Axios (Integrações HTTP)
- Class Validator/Transformer
- Passport.js

## 📋 Pré-requisitos

- Node.js (v18 ou superior)
- Docker e Docker Compose
- Git

## 🔧 Configuração e Execução

### Usando Docker (Recomendado)

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/nestjs-api.git
cd nestjs-api
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

3. Execute o setup completo do Docker (recomendado):
```bash
npm run docker:full-setup
```

Este comando vai:
- Parar todos os containers existentes
- Remover volumes antigos
- Reconstruir as imagens
- Iniciar os containers
- Executar as migrações
- Executar os seeds

Ou, se preferir, pode executar os comandos separadamente:
```bash
npm run setup:docker
```

### Desenvolvimento Local

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/nestjs-api.git
cd nestjs-api
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

3. Execute o setup local:
```bash
npm run setup:local
```

4. Inicie o projeto em modo desenvolvimento:
```bash
npm run start:dev
```

## 📚 Documentação da API

A documentação da API está disponível através do Swagger UI:
```
http://localhost:3000/api/docs
```

## 🐳 Docker

O projeto inclui configuração Docker completa:

### Dockerfile
- Multi-stage build para otimização
- Node.js 18 Alpine como base
- Instalação otimizada de dependências
- Configuração de produção

### Docker Compose
- Serviço de API NestJS
- Banco de dados PostgreSQL
- pgAdmin para gerenciamento do banco de dados
- Volumes para persistência
- Rede dedicada
- Variáveis de ambiente configuradas

### Portas
- API: 3000
- PostgreSQL: 5432
- pgAdmin: 5050

### Acessando o pgAdmin
1. Acesse http://localhost:5050
2. Faça login com as credenciais:
   - Email: admin@admin.com
   - Senha: admin
3. Adicione um novo servidor:
   - Host: postgres
   - Port: 5432
   - Database: nestjs
   - Username: postgres
   - Password: postgres

### Comandos Docker Úteis
```bash
# Setup completo (recomendado)
npm run docker:full-setup

# Outros comandos úteis
npm run docker:build    # Apenas build das imagens
npm run docker:up       # Iniciar containers
npm run docker:down     # Parar containers
npm run docker:restart  # Reiniciar containers
npm run docker:logs     # Ver logs
npm run docker:clean    # Limpar tudo
npm run docker:rebuild  # Reconstruir sem cache
```
