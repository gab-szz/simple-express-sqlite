import { db } from "@/lib/sqlite/db";
import { IAutorRepository } from "./autorRepositoryInterface";
import { IAutor } from "@/types/autor";

export class AutorRepositorySQLite implements IAutorRepository {
  async criar(autor: IAutor): Promise<number> {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO autores (nome) VALUES (?)`;
      db.run(query, [autor.nome], function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  }

  async filtrar(
    filtro: { nome?: string },
    limit: number,
    offset: number
  ): Promise<IAutor[]> {
    const { nome } = filtro;
    let query = "SELECT * FROM autores WHERE 1=1";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any[] = [];

    if (nome) {
      query += " AND nome LIKE ?";
      params.push(`%${nome}%`);
    }

    query += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    return new Promise((resolve, reject) => {
      db.all(query, params, (err, rows) => {
        if (err) return reject(err);
        resolve(rows as IAutor[]);
      });
    });
  }

  async listarTodos(limit: number, offset: number): Promise<IAutor[]> {
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM autores`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const params: any[] = [];

      query += " LIMIT ? OFFSET ?";
      params.push(limit, offset);

      db.all(query, params, (err: Error | null, rows: IAutor[] = []) => {
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

  async deletar(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM autores WHERE id = ?`;

      db.run(query, [id], function (err) {
        if (err) return reject(err);

        // Retorna true se algo foi deletado, false se não
        resolve(this.changes > 0);
      });
    });
  }
}
