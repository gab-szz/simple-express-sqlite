import { ILivro } from "@/types/livro";
import { ILivroRepository } from "./livroRepositoryInterface";
import { db } from "@/lib/sqlite/db";

export class LivroRepository implements ILivroRepository {
  async criar(livro: ILivro): Promise<number> {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO livros (titulo, autor_id) VALUES (?, ?)`;
      db.run(query, [(livro.titulo, livro.autor_id)], function (err) {
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

  async atualizar(livro: ILivro): Promise<void> {
    return new Promise((resolve, reject) => {
      const query = `UPDATE livros SET titulo = ? autor_id = ? WHERE id ?`;
      db.run(query, [livro.id, livro.titulo, livro.autor_id], function (err) {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  async deletar(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM livros WHERE id = ?`, [id], function (err) {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}
