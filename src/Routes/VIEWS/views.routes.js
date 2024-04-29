import { Router } from "express";
import {
  getChat,
  home,
  resetView,
  frontEndUser,
  getProducts
} from "../../Controllers/VIEWS/general.views.controller.js";
import {
  passportCall,
  authorization,
} from "../../utils/authorizations.js";
import cors from "cors";
import config from "../../config/config.js";

const router = Router();

router.use(
  cors({
    credentials: true,
    origin: config.rootUrl,
  })
);

router.get("/", home);

router.get(
  "/chat",
  passportCall("jwt"),
  authorization(["user", "premium"]),
  getChat
);

router.get("/products", getProducts);

router.get("/resetPassword", resetView);

router.get("/frontEndUser", passportCall("jwt"), frontEndUser);

export default router;
