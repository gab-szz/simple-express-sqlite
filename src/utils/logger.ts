// src/utils/logger.ts
import pino from "pino";

export const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "SYS:standard",
      colorize: true,
    },
  },
});
