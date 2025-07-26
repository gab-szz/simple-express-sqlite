import { describe, it, expect, beforeEach, vi } from "vitest";
import { AutorServiceImpl } from "@/services/autorService";
import { IAutorRepository } from "@/repositories/autorRepositoryInterface";
import { IAutor } from "@/types/autor";

// Mock do repositório conforme IAutorRepository
const fakeRepo = {
  criar: vi.fn<(autor: IAutor) => Promise<number>>(),
  filtrar:
    vi.fn<
      (
        filtro: { nome?: string },
        limit: number,
        offset: number
      ) => Promise<IAutor[] | null>
    >(),
  listarTodos: vi.fn<(limit: number, offset: number) => Promise<IAutor[]>>(),
  buscarPorId: vi.fn<(id: number) => Promise<IAutor | null>>(),
  atualizar: vi.fn<(id: number, autor: IAutor) => Promise<boolean>>(),
  deletar: vi.fn<(id: number) => Promise<boolean>>(),
} satisfies IAutorRepository;

let service: AutorServiceImpl;

beforeEach(() => {
  vi.clearAllMocks();
  service = new AutorServiceImpl(fakeRepo);
});

describe("AutorService", () => {
  it("deve criar um autor e retornar o id", async () => {
    fakeRepo.criar.mockResolvedValueOnce(7);
    const id = await service.criar("Maria");
    expect(id).toBe(7);
    expect(fakeRepo.criar).toHaveBeenCalledWith({ nome: "Maria" });
  });

  it("deve listar autores com paginação", async () => {
    const mockList: IAutor[] = [
      { id: 1, nome: "A" },
      { id: 2, nome: "B" },
    ];
    fakeRepo.listarTodos.mockResolvedValueOnce(mockList);

    const resultado = await service.listar(2, 5);
    // offset = (page-1)*limit = (2-1)*5 = 5
    expect(resultado).toEqual(mockList);
    expect(fakeRepo.listarTodos).toHaveBeenCalledWith(5, 5);
  });

  it("deve filtrar autores com paginação", async () => {
    const mockFilter: IAutor[] = [{ id: 3, nome: "Carlos" }];
    fakeRepo.filtrar.mockResolvedValueOnce(mockFilter);

    const resultado = await service.filtrar({ nome: "Car" }, 3, 2);
    // offset = (3-1)*2 = 4
    expect(resultado).toEqual(mockFilter);
    expect(fakeRepo.filtrar).toHaveBeenCalledWith({ nome: "Car" }, 2, 4);
  });

  it("deve buscar autor por id existente", async () => {
    const autorMock: IAutor = { id: 5, nome: "João" };
    fakeRepo.buscarPorId.mockResolvedValueOnce(autorMock);

    const result = await service.buscar(5);
    expect(result).toEqual(autorMock);
    expect(fakeRepo.buscarPorId).toHaveBeenCalledWith(5);
  });

  it("deve retornar null ao buscar id inexistente", async () => {
    fakeRepo.buscarPorId.mockResolvedValueOnce(null);
    const result = await service.buscar(999);
    expect(result).toBeNull();
  });

  it("deve atualizar autor existente", async () => {
    fakeRepo.atualizar.mockResolvedValueOnce(true);
    const success = await service.atualizar(8, "Pedro");
    expect(success).toBe(true);
    expect(fakeRepo.atualizar).toHaveBeenCalledWith(8, { nome: "Pedro" });
  });

  it("deve retornar false ao atualizar id inexistente", async () => {
    fakeRepo.atualizar.mockResolvedValueOnce(false);
    const success = await service.atualizar(100, "Luiza");
    expect(success).toBe(false);
  });

  it("deve deletar autor existente", async () => {
    fakeRepo.deletar.mockResolvedValueOnce(true);
    const success = await service.deletar(4);
    expect(success).toBe(true);
    expect(fakeRepo.deletar).toHaveBeenCalledWith(4);
  });

  it("deve retornar false ao deletar id inexistente", async () => {
    fakeRepo.deletar.mockResolvedValueOnce(false);
    const success = await service.deletar(200);
    expect(success).toBe(false);
  });
});
