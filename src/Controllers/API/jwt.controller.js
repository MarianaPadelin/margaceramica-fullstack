import { validatePass, generateJWToken } from "../../utils/authorizations.js";
import config from "../../config/config.js";
import { userService } from "../../Services/services.js";

export const register = async (req, res) => {
  req.logger.info("Registrando usuario");
  res
    .status(201)
    .send({ status: "success", message: "Usuario creado con éxito." });
};

export const logUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await userService.findUser(email);
    if (!userExists) {
      req.logger.error(`User doesn't exist: ${email}`);
      return res.status(404).send({
        error: "User not found",
        message: "Usuario no encontrado: " + email,
      });
    }
    if (!validatePass(userExists, password)) {
      req.logger.error(`Invalid credentials for user: ${email}`);
      return res.status(401).send({
        status: "error",
        error: "Credenciales incorrectas",
      });
    }

    const loginTime = new Date();

    await userService.updateConnection(email, loginTime);

    const tokenUser = {
      _id: userExists._id,
      name: `${userExists.first_name} ${userExists.last_name}`,
      email: userExists.email,
      age: userExists.age,
      role: userExists.rol,
      status: userExists.status,
      cart: userExists.cart._id,
    };

    const access_token = generateJWToken(tokenUser);
    req.logger.info(`El token es: ${access_token}`);
    req.logger.info(`El rol es ${tokenUser.role}`);

    //el primer parámetro es el nombre de la cookie, el segundo es la info que contiene, el tercero su configuración
    res.cookie("jwtCookieToken", access_token, {
      maxAge: 600000,
      httpOnly: true, //No se expone la cookie
    });
    req.logger.info(`cookie creada`);

    if (userExists.rol === "admin") {
      req.logger.info(`Admin conectado`);
      return res.status(201).send(userExists);
    }
    if (userExists.rol === "premium") {
      req.logger.info("Usuario premium conectado");
      return res.status(202).send(userExists);
    }
    req.logger.info(`Usuario conectado`);

    res.status(200).send(userExists);
  } catch (error) {
    req.logger.error(error);
    return res.status(500).send({
      status: "error",
      error: "Error interno de la applicacion.",
    });
  }
};


export const logout = async (req, res) => {
  const email = req.user.email;
  const loginTime = new Date();

  await userService.updateConnection(email, loginTime);
  res.clearCookie("jwtCookieToken");
  req.logger.info("Se ha cerrado la sesión");
  return res.status(200).send("Se ha cerrado la sesión");
};

export const githubcallback = async (req, res) => {
  const userExists = req.user;

  const tokenUser = {
    _id: userExists._id,
    name: `${userExists.first_name} ${userExists.last_name}`,
    email: userExists.email,
    age: userExists.age,
    role: userExists.rol,
    status: userExists.status,
    cart: userExists.cart._id,
  };
  const access_token = generateJWToken(tokenUser);
  res.cookie("jwtCookieToken", access_token, {
    maxAge: 120000,
    httpOnly: true,
  });

  if (userExists.rol.includes("user")) {
    req.logger.info(`User conectado`);
    res.status(200).redirect(config.rootUrl);

  } else if (userExists.rol.includes("admin")) {
    req.logger.info(`Admin conectado`);
    res.status(201).redirect(config.rootUrl);

  } else if (userExists.rol.includes("premium")) {
    req.logger.info(`User premium conectado`);
    res.status(202).redirect(config.rootUrl);
    
  } else {
    return res.redirect(config.rootUrl);
  }
};

export const failRegister = (req, res) => {
  res.status(401).send({ error: "Falla al registrarse" });
};


export const failLogin = (req, res) => {
  res.status(401).send({ error: "Falla al iniciar sesión" });
}