import multer from "multer";
import __dirname from "../dirname.js";
import logger from "./loggers.js";

const storage = multer.diskStorage({
  // ubicaion del directorio donde voy a guardar los archivos
  destination: function (req, file, cb) {
    const { destination } = req.params;
    if (destination === "profile") {
      cb(null, `${__dirname}/public/img/profile`);
    } else if (destination === "products") {
      cb(null, `${__dirname}/public/img/products`);
    } else {
      cb(null, `${__dirname}/public/img/documents`);
    }
  },

  // el nombre que quiero que tengan los archivos que voy a subir
  filename: function (req, file, cb) {

    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploader = multer({
  storage,
  // si se genera algun error, lo capturamos
  onError: function (err, next) {
    logger.error(err);
    next();
  },
});