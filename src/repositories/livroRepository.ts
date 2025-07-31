import { ILivro } from "@/types/livro";
import { ILivroRepository } from "./livroRepositoryInterface";
import { db } from "@/config/sqlite";

export class LivroRepositorySQLite implements ILivroRepository {
  async criar(livro: ILivro): Promise<number> {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO livros (titulo, autor_id) VALUES (?, ?)`;
      db.run(query, [livro.titulo, livro.autor_id], function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  }

  async filtrar(
    filtro: {
      titulo?: string;
      autor_id?: number;
    },
    limit: number,
    offset: number
  ): Promise<ILivro[]> {
    const { titulo, autor_id } = filtro;
    let query = "SELECT * FROM livros WHERE 1 = 1";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any[] = [];

    if (titulo) {
      query += " AND titulo LIKE ?";
      params.push(`%${titulo}%`);
    }

    if (autor_id) {
      query += " AND autor_id = ?";
      params.push(autor_id);
    }

    query += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    return new Promise((resolve, reject) => {
      db.all(query, params, (err, rows) => {
        if (err) reject(err);
        resolve(rows as ILivro[]);
      });
    });
  }

  async buscarPorId(id: number): Promise<ILivro | null> {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM livros WHERE id = ?`,
        [id],
        (err: Error | null, row: ILivro | null = null) => {
          if (err) reject(err);
          else resolve(row || null);
        }
      );
    });
  }

  async atualizar(livro: ILivro): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = `UPDATE livros SET titulo = ?, autor_id = ? WHERE id = ?`;
      db.run(query, [livro.titulo, livro.autor_id, livro.id], function (err) {
        if (err) reject(err);
        else resolve(this.changes > 0);
      });
    });
  }

  async deletar(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM livros WHERE id = ?`;

      db.run(query, [id], function (err) {
        if (err) return reject(err);

        // Retorna true se algo foi deletado, false se não
        resolve(this.changes > 0);
      });
    });
  }
}
