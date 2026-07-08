# Churras Backend

Backend de um sistema para planejamento e cálculo de churrascos.

## Tecnologias

- **NestJS** + **TypeScript**
- **Prisma ORM** (PostgreSQL)
- **Docker** / **Docker Compose**
- **Open-Meteo API** (geocoding + previsão do tempo)

## Pré-requisitos

- [Node.js](versão 18 ou superior)
- [Docker] e Docker Compose
- Uma instância do **front-end** rodando — repositório: https://github.com/nicolevsantos/meu-churras-front 


## Instalação

Clone o repositório e instale as dependências:

```bash
git clone <url-do-repositorio>
cd churras-backend
npm install
```

Variáveis necessárias 

```env
DATABASE_URL=postgresql://user:password@localhost:5432/churras
JWT_SECRET=sua_chave_secreta
```

## Rodando o projeto

### Com Docker (recomendado)

```bash
docker compose up -d
```

Isso sobe o banco de dados PostgreSQL e demais serviços necessários.

### Migrações do banco

```bash
npx prisma migrate dev
```

### Iniciando a aplicação

```bash
# desenvolvimento (watch mode)
npm run start:dev

# produção
npm run build
npm run start:prod
```

A API estará disponível em `http://localhost:3000`.

## Documentação da API

Com o projeto rodando, a documentação Swagger fica disponível em:

```
http://localhost:3000/api
```

