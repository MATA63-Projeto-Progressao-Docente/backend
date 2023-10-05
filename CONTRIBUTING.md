# Guia para Contribuição
Para os membros da equipe que querem contribuir no projeto do backend.

## Setup
1. Instalar requisitos:
   - node/npm (recomendado instalar com o nvm)

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
   npx prisma migrate dev
   ```

5. Recomendado configurar o ESLint no seu editor/IDE. O projeto vem com uma pasta `.vscode` com configuração para formatar o arquivo com o ESLint ao salvá-lo.


## Branches
As branches são criadas a partir da branch `dev` e são nomeadas de acordo com as tarefas no Jira. Por exemplo, para a tarefa `MPD-5` foi criada a branch `MPD-5-login`. Você pode criar a descrição que vem depois do código da tarefa do jeito que preferir, contanto que não seja muito longo e esteja de acordo com o que a tarefa pede.


## Commits
Deve ser escrito em inglês e seguindo o formato Conventional Commits. Veja mais no link: https://www.conventionalcommits.org/


## Orientações para Ferramentas

### Prisma
- Use `npx prisma migrate deploy` quando quiser apenas clonar+executar projeto.
  - O comando aplica as migrations pendentes e atualiza (ou cria) o banco de dados.
- Use `npx prisma db push` quando quiser atualizar banco baseado no schema, mas sem criar migrations.
- Use `npx prisma migrate dev` após editar o schema do banco. Importante fazer isso assim que concluir um trabalho, para que outros colaboradores possam atualizar o projeto com o mesmo comando sem haver conflitos e problemas.
  - Detalhe de execução:
    1. roda as migrations do histório em um db provisório para detectar diferenças
    2. aplica migrations pendentes
    3. gera migration para mudanças feitas no schema
    4. aplica migrations novas e atualiza histórico no db
    5. atualiza o prisma client
    6. faz o seed (se existir)