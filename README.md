# Projeto Gestão Financeira - Front-End e Back-End

Este README abrange as informações gerais do projeto de Gestão Financeira, incluindo o front-end e o back-end. O projeto visa permitir aos usuários gerenciar suas transações financeiras, oferecendo funcionalidades como registro, login, adicião de transações e visualização de relatórios.

## Estrutura do Projeto

- **Pasta `financas-back`**: Contém o código do back-end desenvolvido em TypeScript, utilizando Express, Knex, MySQL, e JSON Web Token (JWT) para autenticação.
- **Pasta `financas-front`**: Contém o código do front-end desenvolvido em Vue.js com o Quasar Framework, integrando com a API do back-end.

## Tecnologias Utilizadas

### Back-End
- **Node.js** e **Express**: Para criar a API RESTful do projeto.
- **TypeScript**: Para uma tipagem mais robusta durante o desenvolvimento.
- **Knex.js**: Para interação com o banco de dados MySQL.
- **MySQL**: Banco de dados relacional.
- **JWT**: Autenticação e gerenciamento de sessões seguras.
- **bcryptjs**: Para hash de senhas.

### Front-End
- **Vue.js**: Framework JavaScript para construir a interface de usuário.
- **Quasar Framework**: Framework responsivo baseado em Vue.js.
- **Axios**: Biblioteca para realizar requisições HTTP.
- **Chart.js**: Para visualização de relatórios financeiros em gráficos.
- **bcryptjs**: Para criptografia de dados no front-end.

## Como Rodar o Projeto

### Clonar o Repositório

```bash
$ git clone https://github.com/daniellemes2017/Gestao-Financeira-Projeto.git
$ cd Gestao-Financeira-Projeto
```

### Back-End

1. **Ir para a pasta do back-end**

```bash
$ cd financas-back
```

2. **Instalar dependências**

```bash
$ npm install
```

3. **Configurar variáveis de ambiente**

Crie um arquivo `.env` com as seguintes variáveis:

```
# Ambiente de Produção
DATABASE_URL=mysql://root:AFcSSnOHoWfyoNyOtDfMrttxbAcXcLzR@junction.proxy.rlwy.net:59987/railway
JWT_SECRET=<sua-chave-secreta>
PORT=5000
```

4. **Rodar as migrações** para criar as tabelas do banco de dados:

```bash
$ npx knex migrate:latest --knexfile knexfile.ts
```

5. **Popular o banco de dados** com dados iniciais (opcional):

```bash
$ npx knex seed:run --knexfile knexfile.ts
```

6. **Rodar o servidor de desenvolvimento**

```bash
$ npm run dev
```

### Front-End

1. **Ir para a pasta do front-end**

```bash
$ cd ../financas-front
```

2. **Instalar dependências**

```bash
$ npm install
$ npm install axios bcryptjs chart.js
```

3. **Configurar variáveis de ambiente**

Crie um arquivo `.env` com a seguinte variável:

```
# Ambiente de Produção
VUE_APP_API_BASE_URL=mysql://root:AFcSSnOHoWfyoNyOtDfMrttxbAcXcLzR@junction.proxy.rlwy.net:59987/railway
```

4. **Rodar o servidor de desenvolvimento**

```bash
$ quasar dev
```

## Funcionalidades

- **Registro e Login de Usuários**
- **Gestão de Transações**: Adicionar, editar e remover receitas e despesas.
- **Visualização de Resumo Financeiro**: Gráficos e informações de resumo sobre as transações.

## Banco de Dados Hospedado

Este projeto utiliza o **Railway** para hospedar o banco de dados MySQL. As credenciais estão configuradas no arquivo `.env` do back-end, no campo `DATABASE_URL`.

## Observação sobre as Variáveis de Ambiente

- As variáveis de ambiente são essenciais para garantir a segurança do sistema. Não compartilhe seu arquivo `.env` publicamente.

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.