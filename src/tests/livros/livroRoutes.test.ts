import request from "supertest";
import { describe, it, expect, beforeEach, afterAll } from "vitest";
import app from "@/app";
import { db } from "@/lib/sqlite/db";

describe("Rotas de Livro - Integração", () => {
  // Limpa a tabela antes de cada teste
  beforeEach(async () => {
    await new Promise<void>((resolve, reject) => {
      db.run("DELETE FROM livros", (err) => (err ? reject(err) : resolve()));
    });
  });

  // Fecha a conexão com o banco ao final
  afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
      db.close((err) => (err ? reject(err) : resolve()));
    });
  });

  it("GET /livros retorna array vazio inicialmente", async () => {
    const res = await request(app).get("/livros");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(0);
  });

  it("POST /livros deve criar e GET /livros/:id retorna o livro", async () => {
    const resCreate = await request(app)
      .post("/livros")
      .send({ titulo: "Livro Teste", autor_id: 1 });

    expect(resCreate.status).toBe(201);
    expect(resCreate.body).toHaveProperty("id");
    const id = resCreate.body.id;

    const resGet = await request(app).get(`/livros/${id}`);
    expect(resGet.status).toBe(200);
    expect(resGet.body).toMatchObject({
      id,
      titulo: "Livro Teste",
      autor_id: 1,
    });
  });

  it("GET /livros/:id com id inexistente retorna 404", async () => {
    const res = await request(app).get("/livros/999");
    expect(res.status).toBe(404);
  });

  it("PUT /livros/:id atualiza o livro existente", async () => {
    const create = await request(app)
      .post("/livros")
      .send({ titulo: "Original", autor_id: 1 });
    const id = create.body.id;

    const resPut = await request(app)
      .put(`/livros/${id}`)
      .send({ titulo: "Atualizado", autor_id: 2 });

    expect(resPut.status).toBe(200);
    expect(resPut.body.mensagem).toBe("Livro atualizado com sucesso.");

    const resGet = await request(app).get(`/livros/${id}`);
    expect(resGet.body).toMatchObject({
      id,
      titulo: "Atualizado",
      autor_id: 2,
    });
  });

  it("DELETE /livros/:id remove o livro", async () => {
    const create = await request(app)
      .post("/livros")
      .send({ titulo: "ParaDeletar", autor_id: 1 });
    const id = create.body.id;

    const resDel = await request(app).delete(`/livros/${id}`);
    expect(resDel.status).toBe(200);
    expect(resDel.body.mensagem).toBe("Livro deletado com sucesso.");

    const resGet = await request(app).get(`/livros/${id}`);
    expect(resGet.status).toBe(404);
  });

  it("GET /livros filtra por nome", async () => {
    await request(app).post("/livros").send({ titulo: "Alpha", autor_id: 5 });
    await request(app).post("/livros").send({ titulo: "Beta", autor_id: 6 });

    const resNome = await request(app).get("/livros").query({ nome: "Al" });
    expect(resNome.status).toBe(200);
    expect(resNome.body).toHaveLength(1);
    expect(resNome.body[0].titulo).toBe("Alpha");
  });

  it("GET /livros filtra por autor_id invalido retorna 400", async () => {
    // Como validateQuery espera autor_id como número, uma query string causa erro 400
    const resAutor = await request(app).get("/livros").query({ autor_id: 6 });
    expect(resAutor.status).toBe(400);
  });
});
