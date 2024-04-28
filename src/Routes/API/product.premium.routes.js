import { Router } from "express";
import { getOwnerProducts } from "../../Controllers/API/products.controller.js";
import { passportCall, authorization } from "../../utils/authorizations.js";

const router = Router();

router.get(
  "/",

  passportCall("jwt"),
  authorization("premium"),
  getOwnerProducts
);

export default router;
