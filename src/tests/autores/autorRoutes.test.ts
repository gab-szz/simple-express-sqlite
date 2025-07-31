import request from "supertest";
import { describe, it, expect, beforeEach, afterAll } from "vitest";
import app from "@/app";
import { db } from "@/config/db";

describe("Rotas de Autor - Integração", () => {
  // Limpa a tabela antes de cada teste
  beforeEach(async () => {
    await new Promise<void>((resolve, reject) => {
      db.run("DELETE FROM autores", (err) => (err ? reject(err) : resolve()));
    });
  });

  // Fecha a conexão com o banco ao final
  afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
      db.close((err) => (err ? reject(err) : resolve()));
    });
  });

  it("GET /autores retorna array vazio inicialmente", async () => {
    const res = await request(app).get("/autores");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(0);
  });

  it("POST /autores cria e GET /autores/:id retorna o autor", async () => {
    const resCreate = await request(app)
      .post("/autores")
      .send({ nome: "Gabriel" });

    expect(resCreate.status).toBe(201);
    expect(resCreate.body).toHaveProperty("id");
    expect(resCreate.body.nome).toBe("Gabriel");
    const id = resCreate.body.id;

    const resGet = await request(app).get(`/autores/${id}`);
    expect(resGet.status).toBe(200);
    expect(resGet.body).toMatchObject({ id, nome: "Gabriel" });
  });

  it("GET /autores/:id inexistente retorna 404", async () => {
    const res = await request(app).get("/autores/999");
    expect(res.status).toBe(404);
  });

  it("PUT /autores/:id atualiza o autor existente", async () => {
    const create = await request(app).post("/autores").send({ nome: "Ana" });
    const id = create.body.id;

    const resPut = await request(app)
      .put(`/autores/${id}`)
      .send({ nome: "Ana Silva" });

    expect(resPut.status).toBe(200);
    expect(resPut.body.mensagem).toBe("Autor atualizado com sucesso.");

    const resGet = await request(app).get(`/autores/${id}`);
    expect(resGet.body.nome).toBe("Ana Silva");
  });

  it("DELETE /autores/:id remove o autor", async () => {
    const create = await request(app).post("/autores").send({ nome: "Carlos" });
    const id = create.body.id;

    const resDel = await request(app).delete(`/autores/${id}`);
    expect(resDel.status).toBe(200);
    expect(resDel.body.mensagem).toBe("Autor deletado com sucesso.");

    const resGet = await request(app).get(`/autores/${id}`);
    expect(resGet.status).toBe(404);
  });

  it("GET /autores?nome filtra por parte do nome", async () => {
    await request(app).post("/autores").send({ nome: "Bruno" });
    await request(app).post("/autores").send({ nome: "Clara" });

    const resFilter = await request(app).get("/autores").query({ nome: "Br" });

    expect(resFilter.status).toBe(200);
    expect(resFilter.body).toHaveLength(1);
    expect(resFilter.body[0].nome).toBe("Bruno");
  });
});
