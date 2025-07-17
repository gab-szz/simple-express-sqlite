import express, { Request, Response, Express } from "express";
import autorRoutes from "@/routes/autorRoutes";
import livroRoutes from "@/routes/livroRoutes";

const routes = (app: Express) => {
  app.use(express.json());

  app.route("/").get((req: Request, res: Response) => {
    res.status(200).json({ mensagem: "API de Livros e Autores!" });
  });

  app.use("/autores", autorRoutes);
  app.use("/livros", livroRoutes);
};

export default routes;
