import winston from "winston";
import config from "../config/config.js";

import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const customLevelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "black",
    warning: "yellow",
    info: "blue",
    http: "white",
    debug: "green",
  },
};

winston.addColors(customLevelOptions.colors);

//Logger:
const logger = winston.createLogger({
  levels: customLevelOptions.levels,
  transports: [
    new winston.transports.Console({
      level: config.maxLevelConsole,

      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./errors.log",
      level: config.maxLevelFile,
    }),
  ],
});

//middleware de logger:
export const addLogger = (req, res, next) => {
  req.logger = logger;

  //lo que quiero registrar en los logs. En este caso ${método} en ${ruta} at ${fecha y hora}
  req.logger.http(
    `${req.method} en ${
      req.url
    } - at ${new Date().toLocaleDateString()}- ${new Date().toLocaleTimeString()}`
  );

  next();
};

export default logger;
