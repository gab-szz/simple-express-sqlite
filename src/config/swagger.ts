// src/config/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Livros e Autores",
      version: "1.0.0",
      description: "Documentação gerada automaticamente com Swagger JSDoc",
    },
    servers: [
      {
        url: "http://localhost:3030",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // arquivos onde estão os JSDoc das rotas
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
