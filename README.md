# 📚 API de Livros e Autores

Este é um projeto de **API RESTful simples** desenvolvido com **Node.js**, **Express**, **SQLite3**, **Zod**, **dotenv** e **TypeScript**. A API realiza **CRUD completo** para duas entidades: `Livros` e `Autores`.

> 💼 Projeto desenvolvido como demonstração de aprendizado e prática para portfólio pessoal.

---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [SQLite3](https://www.sqlite.org/index.html)
- [Zod](https://zod.dev/) — Validação de dados
- [dotenv](https://github.com/motdotla/dotenv) — Variáveis de ambiente

---

## 📂 Estrutura do Projeto

```
📆 simple-express-sqlite/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── database/
│   ├── schemas/
│   ├── server.ts
│   └── app.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📘 Funcionalidades da API

### 📁 Entidades:

#### Autores

- `GET /autores` — Listar todos os autores
- `POST /autores` — Criar um novo autor
- `GET /autores/:id` — Buscar um autor específico
- `PUT /autores/:id` — Atualizar dados de um autor
- `DELETE /autores/:id` — Deletar um autor

#### Livros

- `GET /livros` — Listar todos os livros
- `POST /livros` — Criar um novo livro
- `GET /livros/:id` — Buscar um livro específico
- `PUT /livros/:id` — Atualizar dados de um livro
- `DELETE /livros/:id` — Deletar um livro

---

## 🧪 Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/simple-express-sqlite.git
cd simple-express-sqlite
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o `.env`

Crie um arquivo `.env` com o seguinte conteúdo:

```env
PORT=3333
DATABASE_URL=./db.sqlite
```

### 4. Compile o projeto

```bash
npx tsc
```

### 5. Inicie a aplicação

```bash
node dist/server.js
```

> Ou, para ambiente de desenvolvimento com reload automático:

```bash
npm run dev
```

---

## 🔎 Testando a API

Você pode utilizar ferramentas como:

- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)

> A documentação interativa com Swagger será adicionada em breve.

---

## 🛡️ Validação de Dados

Este projeto utiliza [Zod](https://zod.dev/) para garantir que os dados de entrada estejam sempre corretos e seguros antes de qualquer operação no banco.

---

## 🎯 Motivação

Este projeto tem como objetivo praticar:

- Organização de projetos com TypeScript
- Separação clara entre responsabilidades (Rotas, Controllers, Models, Schemas)
- Banco de dados leve (SQLite)
- Boas práticas REST
- Uso real de validação com Zod

---

## 📌 Próximos passos

- ✅ CRUD de livros e autores
- 🧠 Validação com Zod
- 🔐 Autenticação com JWT
- 🧰 Testes automatizados
- 📖 Documentação com Swagger
- 🚀 Deploy com Docker ou Railway

---

## 🤝 Contribuindo

Sinta-se livre para abrir **issues**, sugerir melhorias ou enviar pull requests!

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

## 📚 Referências Oficiais

- [Node.js Documentation](https://nodejs.org/en/docs)
- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [SQLite Documentation](https://sqlite.org/docs.html)
- [Zod Documentation](https://zod.dev/)
- [dotenv GitHub](https://github.com/motdotla/dotenv)

---

Feito com ❤️ por Gabriel
