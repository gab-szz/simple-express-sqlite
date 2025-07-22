import { ILivro } from "@/types/livro";

export interface ILivroRepository {
  criar(livro: ILivro): Promise<number>;
  filtrar(
    filtro: { titulo?: string; autor_id?: number }, // autor_id opcional
    limit: number,
    offset: number
  ): Promise<ILivro[]>;
  buscarPorId(id: number): Promise<ILivro | null>;
  atualizar(livro: ILivro): Promise<boolean>;
  deletar(id: number): Promise<boolean>;
}
