# RecicleAqui
Projeto Interdisciplinar do 2º semestre do Curso Superior de Tecnologia em Desenvolvimento de Software Multiplataforma da Fatec Zona Leste.

## Descrição
RecicleAqui é um projeto web desenvolvido em Node.js e MySQL/MariaDB para facilitar o gerenciamento de clientes e usuários em um sistema de reciclagem. Este repositório contém o código fonte e os arquivos necessários para rodar a aplicação localmente.

---

### Tecnologias Utilizadas
- **Node.js**: Ambiente de execução JavaScript server-side.
- **Express.js**: Framework web para Node.js utilizado para criação do servidor.
- **Express-Handlebars**: Mecanismo de visualização para renderização de páginas HTML.
- **Express-Session**: Módulo para criação de sessões de usuário.
- **Body-Parser**: Middleware para análise de dados das requisições.
- **MySQL2**: Driver MySQL para Node.js.
- **Sequelize**: ORM (Object-Relational Mapping) para interagir com o banco de dados.
### Requisitos
- Node.js instalado
- MySQL/MariaDB instalado e configurado
### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/WebCrafters-ZL/recicleaqui.git
2. Acesse o diretório do projeto:
    ```bash
    cd recicleaqui
3. Instale as dependências do projeto:
    ```bash
    npm install
### Configuração das variáveis de ambiente
1. Crie um arquivo .env na raiz do projeto, baseado no arquivo .env.example. 
    - **DICA**: Copie o conteúdo do .env.example e preencha apenas os valores, sem espaço após o **=**
2. Preencha as variáveis de ambiente no arquivo .env com as informações do seu ambiente.

### Inicialização do banco de dados
1. Execute o seguinte comando para criar o banco de dados (caso ainda não tenha sido criado):
    ```bash
    npx sequelize-cli db:create
2. Execute o seguinte comando para executar as migrações e criar as tabelas no banco de dados:
    ```bash
    npx sequelize-cli db:migrate
### Execução do projeto
- Para iniciar o servidor em ambiente de desenvolvimento, execute o seguinte comando:
    ```bash
    npm run dev
