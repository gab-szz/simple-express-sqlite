import { IAutor } from "@/types/autor";

export interface AutorService {
  criar(nome: string): Promise<number>;
  listar(): Promise<IAutor[]>;
  buscar(id: number): Promise<IAutor | null>;
  atualizar(id: number, nome: string): Promise<void>;
  deletar(id: number): Promise<void>;
}
