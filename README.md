# 📚 Simple Express SQLite API

API RESTful simples e robusta desenvolvida com **Express**, **SQLite**, **TypeScript** e **Vitest**, ideal para aprendizado ou base para novos projetos.

> 🔧 Feita por [Gabriel Silvio](https://github.com/gabrielsilv0) — Desafio técnico com foco em boas práticas, cobertura de testes e documentação Swagger.

---

## 🚀 Tecnologias Utilizadas

| Categoria            | Ferramenta                                                                            |
| -------------------- | ------------------------------------------------------------------------------------- |
| **Linguagem**        | [TypeScript](https://www.typescriptlang.org/)                                         |
| **Servidor**         | [Express 5](https://expressjs.com/)                                                   |
| **Banco de dados**   | [SQLite3](https://www.sqlite.org/index.html)                                          |
| **Testes**           | [Vitest](https://vitest.dev/) + [Supertest](https://github.com/visionmedia/supertest) |
| **Validação**        | [Zod](https://zod.dev/)                                                               |
| **Documentação**     | [Swagger UI](https://swagger.io/tools/swagger-ui/) via `swagger-jsdoc`                |
| **Estilo de código** | [ESLint](https://eslint.org/) com TypeScript plugin                                   |
| **Env config**       | Suporte a `.env` com variáveis `NODE_ENV`, `PORTA`, etc                               |

---

## 📂 Estrutura do Projeto

```
src/
 ├── config/        # Configurações globais (ex: Swagger)
 ├── controllers/   # Lógica das rotas (chama os services)
 ├── env/           # Carregamento de variáveis ambiente
 ├── errors/        # Classe AppError para tratamento global
 ├── lib/           # Bibliotecas de suporte (ex: SQLite)
 ├── middlewares/   # Middlewares genéricos (ex: validação)
 ├── repositories/  # Acesso ao banco (SQLite)
 ├── routes/        # Endpoints REST
 ├── schemas/       # Validações com Zod + Swagger
 ├── services/      # Lógica de negócio
 ├── tests/         # Testes com Vitest + Supertest
 ├── types/         # Interfaces tipadas
 ├── app.ts        # Instância da aplicação Express
 └── server.ts     # Inicialização do servidor
```

---

## 📘 Documentação via Swagger

Acesse a **documentação interativa Swagger** em:

👉 [`http://localhost:PORTA/api-docs`](http://localhost:PORTA/api-docs)

Ela cobre os recursos de:

- `/autores` → CRUD de autores
- `/livros` → CRUD de livros

Schemas validados e documentados com **Zod**.

---

## 🧪 Testes Automatizados

Rodar testes unitários e de integração:

```bash
npm run test        # Executa os testes uma vez
npm run test:watch  # Modo interativo
```

Rodar testes com cobertura:

```bash
npx vitest run --coverage
```

**Cobertura atual:**

- ✅ Camada de serviço com mocks de repositório
- ✅ Camada de rotas com dados reais em SQLite
- ✅ Inserção, busca, atualização e deleção testadas

---

## ▶️ Executando o projeto

1. **Clonar o repositório:**

```bash
git clone https://github.com/seu-usuario/nome-projeto
cd nome-projeto
```

2. **Instalar dependências:**

```bash
npm install
```

3. **Configurar variáveis de ambiente:**

Crie um `.env` com base no `.env.example`:

```bash
cp .env.example .env
```

Exemplo de `.env`:

```env
NODE_ENV=development
PORTA=3000
```

4. **Rodar em modo desenvolvimento:**

```bash
npm run start:dev
```

A API ficará disponível em:
👉 `http://localhost:3000`

> 🔹 O banco `banco.sqlite` será criado automaticamente.

---

## 📓 Exemplos de uso

Criação de autor:

```http
POST /autores
{
  "nome": "Gabriel Silvio"
}
```

Criação de livro:

```http
POST /livros
{
  "titulo": "Meu Livro",
  "autor_id": 1
}
```

---

## 📙 Conhecimentos aplicados

- ✅ Separacão em camadas (Controller, Service, Repository)
- ✅ Interface única para repositórios (`IAutorRepository`, `ILivroRepository`)
- ✅ Injeção manual de dependência
- ✅ Tipagem total com `TypeScript`
- ✅ Testes unitários com mocks e integração com DB
- ✅ Swagger dinâmico gerado a partir dos schemas Zod
- ✅ Boas práticas de arquitetura limpa
- ✅ Validação robusta com Zod
- ✅ Middlewares reutilizáveis

---

## 🔶 Scripts disponíveis

| Script                      | Ação                               |
| --------------------------- | ---------------------------------- |
| `npm run start:dev`         | Inicia API com `tsx` em modo watch |
| `npm run test`              | Roda os testes com `Vitest`        |
| `npm run test:watch`        | Testes em modo interativo          |
| `npx vitest run --coverage` | Gera relatório de cobertura        |

---

## 📌 Requisitos

- Node.js 18+
- NPM 9+
- Sistema operacional com suporte a SQLite (Windows, Linux, Mac)

---

## 📨 Contato

Dúvidas, sugestões ou feedbacks?
📧 [gabriel.santos@gestmais.com.br](mailto:gabriel.santos@gestmais.com.br)
