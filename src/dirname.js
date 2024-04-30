import path from "path";

import { fileURLToPath } from "url";

//  fileURLToPath: Esta función garantiza la decodificación correcta de los caracteres codificados en porcentaje.

//  dirname: Devuelve el nombre de directorio de una ruta.

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default __dirname;
