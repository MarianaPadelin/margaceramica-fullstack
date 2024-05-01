import passport from "passport";
import passportLocal from "passport-local";
import { createHash, validatePass, PRIVATE_KEY } from "../utils/authorizations.js";
import jwtStrategy from "passport-jwt";
import GitHubStrategy from "passport-github2";
import config from "./config.js";
import { cartService } from "../Services/services.js";
import { userService } from "../Services/services.js";
import __dirname from "../dirname.js";

//Declaramos la estrategia (qué tipo de passport voy a usar)
const localStrategy = passportLocal.Strategy;

//Declaramos estrategias de jwt
const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

//inicializamos passport
const inicializePassport = () => {
  //Estrategia de obtener Token JWT por Cookie:
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload.user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //estrategia con github:

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackUrl: config.callbackURL,
      },
      //estos parámetros son propios de passport
      async (accesstoken, refreshtoken, profile, done) => {
        try {
          const email = profile._json.email;
          const userExists = await userService.findUser(email);
          if (!userExists) {
            let cart = {};

            const newCart = await cartService.save(cart);

            if (profile._json.email === config.adminMail) {
              let newUser = {
                first_name: profile._json.name,
                last_name: profile._json.last_name || ".",
                age: profile._json.age || 100,
                email: profile._json.email,
                password: "",
                rol: "admin",
                cart: newCart,
                loggedBy: "github",
              };
              
              const result = await userService.createUser(newUser)

              return done(null, result);
            }

            let newUser = {
              first_name: profile._json.name,
              last_name: profile._json.last_name || ".",
              age: profile._json.age || 100,
              email: profile._json.email,
              password: "",
              cart: newCart,
              loggedBy: "github",
            };

            const result = await userService.createUser(newUser);
            return done(null, result);
          } else {
            //el usuario ya existe en la db, entonces lo logueo
            return done(null, userExists);
          }
        } catch (error) {
          return done("Error de github strategy" + error);
        }
      }
    )
  );

  //para register:

  passport.use(
    "register",
    new localStrategy(
      //como es un callback, hago que cuando termine vuelva a la parte de register en la ruta de sesión.
      //Y cambio el parámetro usernameField a email.
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        //le paso lo que tenía en la ruta register
        const { first_name, last_name, age, email } = req.body;
        try {
          const userExists = await userService.findUser(email)
          if (userExists) {
            req.logger.error("El usuario ya existe");

            //null es porque no hay un error, false es porque el usuario ya existe
            return done(null, false);
          }

          let cart = {};

          const newCart = await cartService.save(cart);

          //valido registro como admin:
          if (email === config.adminMail) {
            const user = {
              first_name,
              last_name,
              age,
              email,
              password: createHash(password),
              rol: "admin",
              cart: newCart,
              loggedBy: "passportLocal",
            };

            const result = await userService.createUser(user);
            return done(null, result);
          }

          const user = {
            first_name,
            last_name,
            age,
            email,
            password: createHash(password),
            cart: newCart,
            loggedBy: "passportLocal",
          };
          const result = await userService.createUser(user);
          return done(null, result);
        } catch (error) {
          req.logger.error(error);
          return done("Error de register" + error);
        }
      }
    )
  );

  //funciones de serialización propias de passport:

  passport.serializeUser((userExists, done) => {
    done(null, userExists._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userService.getUser(id)
      done(null, user);
    } catch (error) {
      return error;
    }
  });
};

const cookieExtractor = (req) => {
  let token = null;

  req.logger.debug("Entrando a cookie extractor");

  if (req && req.cookies) {
    token = req.cookies["jwtCookieToken"];

    return token;
  }
  req.logger.warning("No se encontraron cookies");
  return token;
};

export default inicializePassport;
