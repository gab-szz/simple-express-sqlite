import { IAutor } from "@/types/autor";

export interface IAutorRepository {
  criar(autor: IAutor): Promise<number>;
  filtrar(
    filtro: { nome?: string },
    limit: number,
    offset: number
  ): Promise<IAutor[] | null>;
  listarTodos(limit: number, offset: number): Promise<IAutor[]>;
  buscarPorId(id: number): Promise<IAutor | null>;
  atualizar(id: number, autor: IAutor): Promise<void>;
  deletar(id: number): Promise<boolean>;
}
