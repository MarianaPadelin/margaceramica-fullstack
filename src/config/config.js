import dotenv from "dotenv"
import program from "../process.js";

const environment = program.opts().mode
const persistence = program.opts().persist

dotenv.config({
    path: environment === "prod" ? "./src/config/.env.prod" : "./src/config/.env.dev"
})

//no lo puedo sacar porque el logger todavía no está inicializado 
// console.log("Modo de persistencia en " + persistence)
console.log("Environment: " + environment)

//tuve que sacar algunas variables de entorno porque railway sólo me deja poner 10. 
export default {
  port: process.env.PORT || 8080,
  mongoUrl: process.env.MONGO_URL,
  secret: process.env.secret,
  privateKey: process.env.PRIVATE_KEY,
  adminMail: process.env.ADMIN_MAIL,
  adminPass: process.env.ADMIN_PASSWORD,
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: process.env.callbackURL,
  persistence: "mongoDB",
  emailAcount: process.env.cuentadegmail,
  appPassword: process.env.APP_PASSWORD,
  maxLevelConsole: "info",
  maxLevelFile: "error",
  restoreLink:
    "https://proyectofinalbackend-production-12a7.up.railway.app/api/users/resetPassword/",
  rootUrl: "https://proyectofinalfrontend-production-b4ee.up.railway.app/",
};
