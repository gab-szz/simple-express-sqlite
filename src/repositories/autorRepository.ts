import { db } from "@/lib/sqlite/db";
import { AutorRepository } from "./autorRepositoryInterface";
import { IAutor } from "@/types/autor";

export class AutorRepositorySQLite implements AutorRepository {
  async criar(autor: IAutor): Promise<number> {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO autores (nome) VALUES (?)`;
      db.run(query, [autor.nome], function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  }

  async listarTodos(): Promise<IAutor[]> {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM autores`;

      db.all(query, [], (err: Error | null, rows: IAutor[] = []) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  }

  async buscarPorId(id: number): Promise<IAutor | null> {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM autores WHERE id = ?`,
        [id],
        (err: Error | null, row: IAutor | null = null) => {
          if (err) reject(err);
          else resolve(row || null);
        }
      );
    });
  }

  async atualizar(id: number, autor: IAutor): Promise<void> {
    return new Promise((resolve, reject) => {
      const query = `UPDATE autores SET nome = ? where id = ?`;
      db.run(query, [autor.nome, id], function (err) {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  async deletar(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM autores WHERE id = ?`, [id], function (err) {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}
