# Front-End - Gestão Financeira

Este README descreve como rodar o projeto front-end da aplicação de gestão financeira. O projeto foi desenvolvido utilizando Vue.js com o Quasar Framework.

## Tecnologias Utilizadas

- **Vue.js**: Framework JavaScript progressivo para criar interfaces de usuário.
- **Quasar Framework**: Framework baseado em Vue.js para desenvolvimento responsivo.
- **Axios**: Biblioteca para realizar requisições HTTP ao back-end.
- **Chart.js**: Biblioteca para visualização de dados em gráficos.
- **bcryptjs**: Biblioteca para criptografar senhas no front-end.

## Requisitos de Sistema

- **Node.js**: Versão 16+
- **npm** ou **yarn**
- **Quasar CLI**: Instalação recomendada do Quasar para rodar o projeto:
  ```bash
  $ npm install -g @quasar/cli
  ```

## Como Rodar o Projeto

### Clonar o Repositório

```bash
$ git clone https://github.com/daniellemes2017/Gestao-Financeira-Projeto.git
$ cd Gestao-Financeira-Projeto/financas-front
```

### Configuração das Variáveis de Ambiente

Crie um arquivo `.env` na raiz da pasta `financas-front` com o seguinte conteúdo:

#### Ambiente de Produção
```
VUE_APP_API_BASE_URL=mysql://root:AFcSSnOHoWfyoNyOtDfMrttxbAcXcLzR@junction.proxy.rlwy.net:59987/railway
```

- **Importante**: O back-end está hospedado em um serviço em nuvem (Railway).

### Instalar Dependências

```bash
$ npm install
```

### Instalar Dependências Adicionais

Certifique-se de instalar as seguintes dependências utilizadas no projeto:

```bash
$ npm install axios bcryptjs chart.js
```

### Rodar o Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento e acessar a aplicação:

```bash
$ quasar dev
```

## Funcionalidades

- **Registro e Login de Usuários**
- **Gestão de Transações**: Adicionar, editar e remover receitas e despesas.
- **Visualização de Resumo Financeiro**: Gráficos e informações de resumo sobre as transações.

## Deploy

Caso deseje fazer o deploy do front-end em um serviço de hospedagem como Vercel ou Netlify, certifique-se de configurar as variáveis de ambiente corretamente para apontar para a URL do back-end hospedado.

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.


