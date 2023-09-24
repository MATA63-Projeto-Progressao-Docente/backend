# Guia para Contribuição
Para os membros da equipe que querem contribuir no projeto do backend.

## Setup
1. Instalar requisitos:
   - node/npm (recomendado instalar com o nvm)

2. Instalar dependências:
   ```
   npm install
   ```

3. Criar o arquivo de váriaveis do ambiente:
   ```
   cp .env.example .env
   ```

4. Inicializar o Prisma:
   ```
   npx prisma generate
   ```

5. Recomendado configurar o ESLint no seu editor/IDE. O projeto vem com uma pasta `.vscode` com configuração para formatar o arquivo com o ESLint ao salvá-lo.


## Branches
As branches são criadas a partir da branch `dev` e são nomeadas de acordo com as tarefas no Jira. Por exemplo, para a tarefa `MPD-5` foi criada a branch `MPD-5-login`. Você pode criar a descrição que vem depois do código da tarefa do jeito que preferir, contanto que não seja muito longo e esteja de acordo com o que a tarefa pede.


## Commits
Deve ser escrito em inglês e seguindo o formato Conventional Commits. Veja mais no link: https://www.conventionalcommits.org/