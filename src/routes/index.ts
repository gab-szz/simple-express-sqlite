import express, { Request, Response, Express } from "express";

const routes = (app: Express) => {
  app.use(express.json());

  app.route("/").get((req: Request, res: Response) => {
    res.status(200).json({ mensagem: "API de Livros e Autores!" });
  });
};

export default routes;
