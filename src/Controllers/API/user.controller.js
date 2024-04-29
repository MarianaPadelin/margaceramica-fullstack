import { generateJWToken } from "../../utils/authorizations.js";
import { logUser } from "./jwt.controller.js";
import { userService } from "../../Services/services.js";
import { sendUserDeletedEmail } from "../../utils/nodemailer.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAll();

    res.send({
      users,
    });
  } catch (error) {
    req.logger.error(error);
    return res.status(500).send({ error: error.code, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await userService.getUser(uid);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let userLastConnection = user.last_connection;
    let limitConnection = new Date();
    limitConnection.setDate(limitConnection.getDate() - 2);
    if (userLastConnection < limitConnection) {
      req.logger.info(
        "User offline for over two days, the account will be deleted"
      );

      let usuarioBorrado = await userService.getUser(uid);
      let email = usuarioBorrado.email;
      console.log(usuarioBorrado);

      sendUserDeletedEmail(email);
      req.logger.info("email sent to" + email);
      await userService.deleteUser(uid);
      req.logger.info(`User ${uid} deleted`);
      return res
        .status(200)
        .send({ message: "user deleted successfully", user });
    }
    req.logger.info("User has been active, the account can't be deleted");
    return res
      .status(400)
      .send({ message: "Active user can´t be deleted", user });
  } catch (error) {
    req.logger.error(error.cause);
    return res.status(500).send({
      messsage: "Error deleting user",
      error: error,
    });
  }
};
export const modifyUser = async (req, res) => {
  // const { uid } = req.params;
  const uid = res.user._id
  req.logger.info(uid)
  try {
    let user = await userService.getUser(uid);
    let newRole;

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }
    const prevRole = user.rol;
    if (prevRole === "user") {
      newRole = "premium";
      userService.updateUserRole(uid, newRole);
      return req.logger.info(`User ${uid} changed role to ${newRole}`);
    } else {
      newRole = "user";
      userService.updateUserRole(uid, newRole);
      return req.logger.info(`User ${uid} changed role to ${newRole}`);
    }
  } catch (error) {
    req.logger.error(error);
    return res.status(500).send({
      message: "Error changing role",
      error: error,
    });
  }
};



export const switchUser = async (req, res) => {
  const { uid } = req.params;
  req.logger.info(uid);
  const currentRole = req.user.role;
  const userStatus = req.user.status;

  //para cambiar de user a premium
  if (currentRole === "user") {
    if (userStatus === "docsUploaded") {
      req.user.role = "premium";
    } else
      return res
        .status(400)
        .send("Error. Primero debe subir los documentos correspondientes");
    //para cambiar de premium a user
  } else {
    req.user.role = "user";
  }

  const newRole = req.user.role;
  req.logger.info(newRole);
  const user = req.user;

  await userService.updateUserRole(uid, newRole);
  const access_token = generateJWToken(user);
  res.cookie("jwtCookieToken", access_token, {
    maxAge: 600000,
    httpOnly: true,
  });
  res.status(200).send(newRole);
};

export const getUser = async (req, res) => {
  const { uid } = req.params;
  const user = await userService.getUser(uid);

  res.status(200).send({ user });
};

export const uploadFiles = async (req, res) => {
  const { uid } = req.params;
  const { destination } = req.params;
  const uploadedFiles = req.files;
  const user = req.user;

  if (!req.files) {
    return res
      .status(400)
      .send({ status: "error", mensaje: "No se adjunto archivo." });
  }
  // console.log(req.file);

  if (destination === "profile") {
    uploadedFiles.forEach((file) => {
      const imgPath = file.path;
      const imgName = file.originalname;

      userService.updateUserFiles(uid, imgName, imgPath);
    });
    req.logger.info("Imagen subida a profile");
  } else if (destination === "products") {
    uploadedFiles.forEach((file) => {
      const imgPath = file.path;
      const imgName = file.originalname;

      userService.updateUserFiles(uid, imgName, imgPath);
    });
    req.logger.info("Imágenes subida a products");
  } else if (destination === "documents" && uploadedFiles.length === 3) {
    uploadedFiles.forEach((file) => {
      const imgPath = file.path;
      const imgName = file.originalname;

      userService.updateUserFiles(uid, imgName, imgPath);
    });
    //si subió las 3 imágenes que piden en documents, entonces actualiza su estado para que se le habilite a cambiar el rol

    userService.updateUserStatus(uid);

    req.logger.info("Imágenes subida a documents");
  } else {
    req.logger.info("Destino desconocido");
  }

  //tengo que volver a guardar la cookie con el status modificado para que me acepte cambiar a premium
  const access_token = generateJWToken(user);
  res.cookie("jwtCookieToken", access_token, {
    maxAge: 600000,
    httpOnly: true,
  });
  res.send({
    status: "success",
    message: "imagenes subidas con éxito",
  });
};
