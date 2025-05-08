src/
├── main.ts                      # Ponto de entrada da aplicação
├── app.module.ts                # Módulo principal da aplicação
├── common/                      # Código comum/compartilhado
│   ├── decorators/              # Custom decorators
│   │   └── roles.decorator.ts
│   ├── guards/                  # Guards para proteção de rotas
│   │   └── roles.guard.ts
│   ├── filters/                 # Filtros para tratamento de exceções
│   │   └── http-exception.filter.ts
│   ├── interceptors/            # Interceptors para transformação de respostas
│   │   └── transform.interceptor.ts
│   ├── dto/                     # DTOs comuns
│   │   └── pagination.dto.ts
│   └── constants/               # Constantes compartilhadas
│       └── roles.enum.ts
├── config/                      # Configurações da aplicação
│   ├── database.config.ts
│   └── swagger.config.ts
├── modules/                     # Módulos da aplicação
    ├── users/                   # Módulo de Usuários
    │   ├── application/         # Camada de Aplicação
    │   │   ├── dto/             # Data Transfer Objects
    │   │   │   ├── create-user.dto.ts
    │   │   │   └── update-user.dto.ts
    │   │   └── services/        # Serviços de Aplicação
    │   │       └── users.service.ts
    │   ├── domain/              # Camada de Domínio
    │   │   ├── entities/        # Entidades de Domínio
    │   │   │   └── user.entity.ts
    │   │   └── validators/      # Validadores de Domínio
    │   │       └── user.validator.ts
    │   ├── infrastructure/      # Camada de Infraestrutura
    │   │   └── repositories/    # Repositórios para persistência
    │   │       └── users.repository.ts
    │   ├── users.controller.ts  # Controlador para rotas de usuários
    │   ├── users.module.ts      # Módulo de usuários
    │   └── users.error.ts       # Tratamento de erros específicos
    │
    ├── auth/                    # Módulo de Autenticação
    │   ├── application/
    │   │   ├── dto/
    │   │   │   ├── login.dto.ts
    │   │   │   └── register.dto.ts
    │   │   └── services/
    │   │       └── auth.service.ts
    │   ├── domain/
    │   │   └── entities/
    │   │       └── token.entity.ts
    │   ├── infrastructure/
    │   │   └── strategies/
    │   │       └── jwt.strategy.ts
    │   ├── auth.controller.ts
    │   ├── auth.module.ts
    │   └── auth.error.ts
    │
    ├── products/                # Módulo de Produtos
    │   ├── application/
    │   │   ├── dto/
    │   │   │   ├── create-product.dto.ts
    │   │   │   └── update-product.dto.ts
    │   │   └── services/
    │   │       └── products.service.ts
    │   ├── domain/
    │   │   ├── entities/
    │   │   │   └── product.entity.ts
    │   │   └── validators/
    │   │       └── product.validator.ts
    │   ├── infrastructure/
    │   │   └── repositories/
    │   │       └── products.repository.ts
    │   ├── products.controller.ts
    │   ├── products.module.ts
    │   └── products.error.ts
    │
    ├── categories/              # Módulo de Categorias
    │   ├── application/
    │   │   ├── dto/
    │   │   │   ├── create-category.dto.ts
    │   │   │   └── update-category.dto.ts
    │   │   └── services/
    │   │       └── categories.service.ts
    │   ├── domain/
    │   │   ├── entities/
    │   │   │   └── category.entity.ts
    │   │   └── validators/
    │   │       └── category.validator.ts
    │   ├── infrastructure/
    │   │   └── repositories/
    │   │       └── categories.repository.ts
    │   ├── categories.controller.ts
    │   ├── categories.module.ts
    │   └── categories.error.ts
    │
    ├── addresses/               # Módulo de Endereços
    │   ├── application/
    │   │   ├── dto/
    │   │   │   ├── create-address.dto.ts
    │   │   │   └── update-address.dto.ts
    │   │   └── services/
    │   │       └── addresses.service.ts
    │   ├── domain/
    │   │   ├── entities/
    │   │   │   └── address.entity.ts
    │   │   └── validators/
    │   │       └── address.validator.ts
    │   ├── infrastructure/
    │   │   └── repositories/
    │   │       └── addresses.repository.ts
    │   ├── addresses.controller.ts
    │   ├── addresses.module.ts
    │   └── addresses.error.ts
    │
    ├── orders/                  # Módulo de Pedidos
    │   ├── application/
    │   │   ├── dto/
    │   │   │   ├── create-order.dto.ts
    │   │   │   └── update-order.dto.ts
    │   │   └── services/
    │   │       └── orders.service.ts
    │   ├── domain/
    │   │   ├── entities/
    │   │   │   ├── order.entity.ts
    │   │   │   └── order-item.entity.ts
    │   │   └── validators/
    │   │       └── order.validator.ts
    │   ├── infrastructure/
    │   │   └── repositories/
    │   │       ├── orders.repository.ts
    │   │       └── order-items.repository.ts
    │   ├── orders.controller.ts
    │   ├── orders.module.ts
    │   └── orders.error.ts
    │
    ├── cep/                     # Módulo de Consulta de CEP
    │   ├── application/
    │   │   ├── dto/
    │   │   │   └── cep-response.dto.ts
    │   │   └── services/
    │   │       └── cep.service.ts
    │   ├── infrastructure/
    │   │   └── services/
    │   │       └── viaCep.service.ts
    │   ├── cep.controller.ts
    │   ├── cep.module.ts
    │   └── cep.error.ts
    │
    └── pokemon/                 # Módulo de PokeAPI
        ├── application/
        │   ├── dto/
        │   │   └── pokemon-search.dto.ts
        │   └── services/
        │       └── pokemon.service.ts
        ├── infrastructure/
        │   └── services/
        │       └── pokeApi.service.ts
        ├── pokemon.controller.ts
        ├── pokemon.module.ts
        └── pokemon.error.ts