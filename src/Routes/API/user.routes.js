import { Router } from "express";
import {
  switchUser,
  getUser,
  uploadFiles,
  getAllUsers,
  deleteUser,
  modifyUser,
} from "../../Controllers/API/user.controller.js";
// import { passportCall, authorization } from "../../utils/authorizations.js";
import { passportCall, authorization } from "../../utils/authorizations.js";

import {
  resetPasswordEmail,
  resetPassword,
  restorePassword,
} from "../../utils/nodemailer.js";
import { uploader } from "../../utils/multer.js";

import { restoreForm } from "../../Controllers/VIEWS/user.views.controller.js";
import cors from "cors";
import config from "../../config/config.js";

const router = Router();

router.use(
  cors({
    credentials: true,
    origin: config.rootUrl,
  })
);

router.get("/", passportCall("jwt"), authorization(["admin"]), getAllUsers);

router.get("/:uid", passportCall("jwt"), authorization(["admin"]), getUser);

router.put("/:uid", passportCall("jwt"), authorization(["admin"]), modifyUser);

router.delete(
  "/:uid",
  passportCall("jwt"),
  authorization(["admin"]),
  deleteUser
);

router.post("/sendEmailToReset", resetPasswordEmail);

router.get("/resetPassword/:token", resetPassword);

router.get(`/restoreForm/:token`, restoreForm);

router.post(`/restoreForm`, restorePassword);

router.post(
  `/:uid/:destination`,
  passportCall("jwt"),
  authorization(["premium", "user"]),
  //lo que esté dentro de array tiene que tener el mismo nombre que voy a subir desde postman
  uploader.any("file"),
  uploadFiles
);

//ruta para cambiar de rol de user a premium
router.get(
  "/premium/:uid",
  passportCall("jwt"),
  authorization(["premium", "user"]),
  switchUser
);

export default router;
