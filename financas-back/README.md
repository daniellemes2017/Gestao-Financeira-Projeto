# Back-End - Gestão Financeira

Este README descreve como rodar o projeto back-end da aplicação de gestão financeira. O projeto foi desenvolvido utilizando Node.js, Express e TypeScript.

## Tecnologias Utilizadas

- **Node.js**: Plataforma para execução de código JavaScript no servidor.
- **Express**: Framework web para Node.js para construção de APIs.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **Knex.js**: Query builder para interação com o banco de dados.
- **MySQL**: Banco de dados relacional utilizado para armazenar as informações.
- **JWT (JSON Web Token)**: Para autenticação e controle de sessão.
- **bcryptjs**: Para criptografar senhas dos usuários.
- **dotenv**: Para gerenciar variáveis de ambiente de forma segura.

## Requisitos de Sistema

- **Node.js**: Versão 16+
- **npm** ou **yarn**

## Como Rodar o Projeto

### Clonar o Repositório

```bash
$ git clone https://github.com/daniellemes2017/Gestao-Financeira-Projeto.git
$ cd Gestao-Financeira-Projeto/financas-back
```

### Configuração das Variáveis de Ambiente

Crie um arquivo `.env` na raiz da pasta `financas-back` com o seguinte conteúdo:

#### Ambiente de Produção
```
DATABASE_URL=mysql://root:AFcSSnOHoWfyoNyOtDfMrttxbAcXcLzR@junction.proxy.rlwy.net:59987/railway
JWT_SECRET=sua_chave_secreta
PORT=5000
```

- **DATABASE_URL**: URL de conexão com o banco de dados hospedado (exemplo: Railway).
- **JWT_SECRET**: Chave secreta para assinar os tokens JWT.
- **PORT:**: Porta em que o servidor será executado.


``
### Dependências principais:

```$ npm install typescript, express, mysql2, knex, jsonwebtoken, bcryptjs, dotenv
```

### Instalar Dependências

```bash
$ npm install
```

### Rodar as Migrações do Banco de Dados

Para criar as tabelas no banco de dados:

```bash
$ npx knex migrate:latest --knexfile knexfile.ts
```

### Rodar as Seeds do Banco de Dados

Para popular o banco de dados com alguns dados iniciais:

```bash
$ npx knex seed:run --knexfile knexfile.ts
```

### Rodar o Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
$ npm run dev
```

### Rodar o Servidor em Produção

Para iniciar o servidor em ambiente de produção:

```bash
$ NODE_ENV=production npm run dev
```

## Funcionalidades

- **Registro e Login de Usuários**: Utilizando autenticação JWT.
- **Gestão de Transações**: Adicionar, editar e remover receitas e despesas dos usuários.
- **Autenticação Segura**: Criptografia de senhas com bcryptjs.

## Endpoints da API

### Autenticação

- **POST /auth/register**: Registra um novo usuário.
- **POST /auth/login**: Realiza o login e retorna um token JWT.

### Transações

- **POST /api/transacoes**: Adiciona uma nova transação.
- **GET /api/transacoes**: Lista todas as transações do usuário.
- **PUT /api/transacoes/:id**: Edita uma transação existente.
- **DELETE /api/transacoes/:id**: Exclui uma transação.

## Deploy

Caso deseje fazer o deploy do back-end em um serviço de hospedagem como Heroku ou Railway, certifique-se de configurar as variáveis de ambiente corretamente para apontar para o banco de dados hospedado.

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.

