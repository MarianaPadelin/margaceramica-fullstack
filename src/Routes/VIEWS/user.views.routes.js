import { Router } from "express";
import { passportCall, authorization, authToken } from "../../utils/authorizations.js";
import {
  getUsers,
  registerUser,
  // getPremiumUsers,
  viewCart,
} from "../../Controllers/VIEWS/user.views.controller.js";
import { getProductForm, getEditForm } from "../../Controllers/VIEWS/admin.views.controller.js";
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

//Vista del listado de productos con la bienvenida al usuario y la opción de ver su carrito
// router.get(
//   "/products",
//   passportCall("jwt"),
//   authorization(["user", "premium"]),
//   getUserProducts
// );

router.get(
  "/cart/:cid",
  passportCall("jwt"),
  authorization(["user", "premium"]),
  viewCart
);

router.get(
  "/addProduct",
  passportCall("jwt"),
  authorization(["admin", "premium"]),
  getProductForm
);

router.get(
  "/editProduct/:pid",
  passportCall("jwt"),
  authorization(["admin", "premium"]),
  getEditForm
);
export default router;
