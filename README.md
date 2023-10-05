# Backend

**Tecnologias**:
- Node.js 18 (LTS)
- Typescript
- Express.js (web framework)
- Prisma (ORM)

## Execução do projeto

*Arquivo `docker-compose` em construção.*  

1. Instalar requisitos:
   - Node/Npm v18 (lts) (recomendado instalar com o nvm)

2. Instalar dependências:
   ```
   npm install
   ```

3. Criar o arquivo de váriaveis do ambiente e setar de acordo com o seu banco de dados (tem um serviço do postgres que você pode criar com o Docker usando o comando `docker compose up -d db`):
   1. Setar a `DATABASE_URL` de acordo com o seu banco de dados. Tem um serviço do Postgres que você pode criar com o Docker usando o comando `docker compose up -d db`
   2. Setar a env `TOKEN_SECRET` de acordo com o que há descrito no arquivo.
   ```
   cp .env.example .env
   ```

4. Inicializar o Prisma:
   ```
   npx prisma migrate deploy
   ```

5. Executar servidor:
   ```
   npm run dev
   ```