import mongoose from "mongoose";
import config from "./config.js";
import __dirname from "../dirname.js";
import logger from "../utils/loggers.js";

export default class MongoSingleton {
  static #instance;

  constructor() {
    this.#connectMongoDB();
  }

  static getInstance() {
    if (this.#instance) {
      logger.warning("Ya se ha abierto una conexion a MongoDB.");

    } else {
      this.#instance = new MongoSingleton();
    }
    return this.#instance;
  }

  #connectMongoDB = async () => {
    try {
      await mongoose.connect(config.mongoUrl, {
        w: 1,
      });

    } catch (error) {
      console.error("No se pudo conectar a la BD usando Moongose: " + error);
      process.exit();
    }
  };
}


