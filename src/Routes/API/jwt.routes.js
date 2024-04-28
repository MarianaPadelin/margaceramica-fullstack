import { Router } from "express";
import passport from "passport";
import {
  failRegister,
  failLogin,
  githubcallback,
  logUser,
  logout,
  register,
} from "../../Controllers/API/jwt.controller.js";
import cors from "cors";
import config from "../../config/config.js";
import { passportCall } from "../../utils/authorizations.js";

const router = Router();

router.use(
  cors({
    credentials: true,
    origin: config.rootUrl,
  })
);

router.post("/login", logUser);

// Register PassportLocal
router.post(
  "/register",
  passport.authenticate("register", {
    session: false,
    failureRedirect: "api/jwt/fail-register",
  }),
  register
);

//Logout

router.get("/logout", passportCall("jwt"), logout);

//Login con github
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user: email"] })
);

//para volver desde la pagina de autorización de github a mi pagina

router.get(
  "/githubcallback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "github/error",
  }),
  githubcallback
);

router.get("/fail-register", failRegister);

router.get("/fail-login", failLogin);

export default router;
