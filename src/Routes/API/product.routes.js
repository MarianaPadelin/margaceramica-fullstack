import { Router } from "express";
import {
  // getAdminProducts,
  getOneProduct,
  postProduct,
  changeProduct,
  deleteProduct,
  getProducts,
} from "../../Controllers/API/products.controller.js";
import { passportCall, authorization } from "../../utils/authorizations.js";

const router = Router();

// router.get("/", passportCall("jwt"), authorization("admin"), getAdminProducts);
router.get("/", getProducts)

router.get("/:pid", getOneProduct);

router.post(
  "/",
  passportCall("jwt"),
  authorization(["admin", "premium"]),
  postProduct
);

router.put(
  "/:pid",
  passportCall("jwt"),
  authorization(["admin", "premium"]),
  changeProduct
);

router.delete(
  "/:pid",
  passportCall("jwt"),
  authorization(["admin", "premium"]),
  deleteProduct
);


export default router;
