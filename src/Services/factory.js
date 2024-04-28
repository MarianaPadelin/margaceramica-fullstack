// //acá tendría que establecer la conexión con la db, en vez de en server.js
// import MongoSingleton from "../config/mongodb.singleton.js";

// import mongoose from "mongoose";
// import MongoStore from "connect-mongo";
// import config from "../config/config.js";

// let productService;
// let cartService;
// let ticketService;
// let userService;

// async function initializeMongoService() {
//   console.log("Iniciando Servicio para MongoDB");
//   try {
//     const MONGO_URL = config.mongoUrl;

//     mongoose
//       .connect(MONGO_URL)
//       .then(() => {
//         console.log("-------- DB connected -------");
//       })
//       .catch((err) => {
//         console.log("Hubo un error de conexión a la DB" + err);
//       });

//     // await MongoSingleton.getInstance();
//   } catch (error) {
//     console.error("Error al iniciar MongoDB:", error);
//     process.exit(1); // Salir con código de error
//   }
// }
// switch (config.persistence) {
//   case mongoDB:
//     initializeMongoService();
//     const { default: ProductServiceMongo } = await import(
//       "./DAOS/mongoDB/product.dao.js"
//     );
//     productService = new productDao();
//     console.log("Servicio de productos cargado:");
//     console.log(productService);

//      const { default: CartServiceMongo } = await import(
//        "./DAOS/mongoDB/cart.dao.js"
//      );
//     cartService = new cartDao();
//     console.log(cartService)

//     const { default: TicketServiceMongo } = await import(
//       "./DAOS/mongoDB/ticket.dao.js"
//     );
//     ticketService = new ticketDao();
//     console.log(ticketService);

//     const { default: UserServiceMongo } = await import(
//       "./DAOS/mongoDB/user.dao.js"
//     );
//     //sacar email y password del token
//     userService = new userDao(email, password)
//     console.log(userService)
//     break;

//   case FileSystem:
//     //todavia no existen estos archivos de fs
//     const { default: ProductServiceFileSystem } = await import(
//       "./DAOS/fileSystem/products.js"
//     );
//     //instancio la clase que tengo en el dao filesystem (clase 28)
//     productService = new StudentServiceFileSystem();

//     //hacer lo mismo con cart y users
//     break;
//   default:
//     console.error(
//       "Persistencia no válida en la configuración:",
//       config.persistence
//     );
//     process.exit(1); // Salir con código de error

// }

// export { productService, cartService, ticketService, userService };
