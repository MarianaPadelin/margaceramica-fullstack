import { Router } from "express";
import { passportCall, authorization, authToken } from "../../utils/authorizations.js";
import {
  getUsers,
  registerUser,
  // getPremiumUsers,
  viewCart,
} from "../../Controllers/VIEWS/user.views.controller.js";
// import { getProductForm, getEditForm } from "../../Controllers/VIEWS/admin.views.controller.js";
// import { getUserProducts } from "../../Controllers/API/products.controller.js";
const router = Router();
import cors from "cors";
import config from "../../config/config.js";

router.use(
  cors({
    credentials: true,
    origin: config.rootUrl,
  })
);

// Vista del formulario de registro
router.get("/register", registerUser);

// Vista del perfil del usuario
router.get(
  "/",
  passportCall("jwt"),
  authorization(["user", "premium"]),
  getUsers
);


//vista del carrito para front
router.get(
  "/cart/:cid",
  passportCall("jwt"),
  authorization(["user", "premium"]),
  viewCart
);

export default router;
