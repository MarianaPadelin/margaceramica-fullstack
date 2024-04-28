import config from "../config/config.js";
import nodemailer from "nodemailer";
import { v4 } from "uuid";

import { ticketService } from "../Services/services.js";
import { userService } from "../Services/services.js";
import { validatePass } from "./authorizations.js";
// import { addLogger } from "./dirname.js";


// import path from "path";

// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);

//NODEMAILER:
// configuracion de transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.emailAcount,
    pass: config.appPassword,
  },
});


// Verificamos conexion con gmail
transporter.verify(function (error, success) {
  if (error) {
    console.log(`Error de verificación ${error}`);
    // logger.error(`Error de verificación ${error}`);
  } else {
    console.log("Server is ready to take our messages");
    // logger.info("Server is ready to take our messages");
  }
});

export const sendEmail = async (id, email) => {
  try {
    const data = await ticketService.getById(id);
    const { _id, products, amount, purchaser, purchase_datetime } = data;
    let productsString = JSON.stringify(products);
    // logger.info(data);
    console.log(data)
    let result = transporter.sendMail({
      from: "Ecommerce Proyecto Final - " + config.emailAcount,
      to: email,
      subject: "Comprobante Ticket de compra",
      html: `<div><h1>Compra exitosa! Adjuntamos el ticket generado: </h1>
      <br /> 
      <h3>Número de seguimiento de compra: ${_id}</h3>
      <br /> 
      <h3>Productos: 
      ${productsString}</h3>
      <br /> 
      <h3>Precio total: ${amount}</h3>
      <br /> 
      <h3>Comprador: ${purchaser}</h3>
      <br /> 
      <h3>Fecha y hora de la compra: ${purchase_datetime}</h3>
      </div>`,
      attachments: [],
    });
    console.log(`Email sent to: ${email}`);
    // logger.info(`Email sent to: ${email}`);

    return result;
  } catch (error) {
    console.log(error)
    // logger.error(error);
    return error;
  }
};

export const sendUserDeletedEmail = async (email) => {
  try {
    const user = await userService.findUser(email);

    if (user) {
      let result = transporter.sendMail({
        from: "Ecommerce Proyecto Final - " + config.emailAcount,
        to: email,
        subject: "Aviso por baja de usuario",
        html: `<div><h1> Estimado usuario, le avisamos que por falta de actividad su cuenta se ha dado de baja. 
         Si desea volver a utilizarla deberá volver a registrarse. Saludos.  </h1></div>`,
        attachments: [],
      });
      console.log(`Email sent to: ${email}`);
      // logger.info(`Email sent to: ${email}`);

      return result;
    }
    console.log("User not found");
    // req.logger.error("User not found");
    return "User not found";
  } catch (error) {
    console.log(error)
    // logger.error(error);
    return error;
  }
};

export const sendProductDeletedEmail = async (email, productTitle) => {
  try {
    const user = await userService.findUser(email);

    if (user) {
      let result = transporter.sendMail({
        from: "Ecommerce Proyecto Final - " + config.emailAcount,
        to: email,
        subject: "Aviso eliminación de producto",
        html: `<div><h1>Notificamos que se ha eliminado el producto ${productTitle} </h1></div>`,
        attachments: [],
      });
      console.log(`Email sent to: ${email}`);
      // logger.info(`Email sent to: ${email}`);

      return result;
    }
    console.log("User not found");
    // req.logger.error("User not found");
    return "User not found";
  } catch (error) {
    console.log("User not found");
    // logger.error(error);
    return error;
  }
};


/*=============================================
=                   Password Reset            =
=============================================*/

const mailOptionsToReset = {
  from: config.emailAcount,
  subject: "Reset password",
};

//esto guardarlo en bbdd
const tempDbMails = {};
//tengo que generar una vista con un campo para ingresar el email
export const resetPasswordEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const userExists = await userService.findUser(email);

    if (!userExists) {
      return res.status(404).send("Email not found");
    }
    // Genero un id provisorio con la libreria uuid
    const token = v4();

    const link = `${config.restoreLink}${token}`;

    //le genero una propiedad token a tempDBMails
    tempDbMails[token] = {
      email,
      expirationTime: new Date(Date.now() + 1 * 15 * 1000),
    };

    req.logger.info(tempDbMails);

    mailOptionsToReset.to = email;
    mailOptionsToReset.html = `To reset your password, click on the following link: <a href="${link}"> Reset Password</a>`;

    transporter.sendMail(mailOptionsToReset, (error, info) => {
      if (error) {
        console.log(error)
        // logger.error(error);
        res.status(500).send({ message: "Error", payload: error });
      }
      res.status(200).send({ message: "Success", payload: info });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: error,
      message: "No se pudo enviar el email desde:" + config.gmailAccount,
    });
  }
};

export const resetPassword = (req, res) => {
  const token = req.params.token;

  const email = tempDbMails[token];

  const now = new Date();
  const expirationTime = email?.expirationTime;

  if (now > expirationTime || !expirationTime) {
    delete tempDbMails[token];
    req.logger.error("Time expired");
    return res.redirect(`${config.rootUrl}/resetPassword`);
  }

  res.redirect(`${config.rootUrl}/restoreForm/${[token]}`);
};

export const restorePassword = async (req, res) => {
  try {
    const { email, password, repeatPassword } = req.body;
    if (password !== repeatPassword) {
      req.logger.error("Both passwords must be the same");
      return res.status(401).send("Both passwords must be the same");
    }
    const userExists = await userService.findUser(email);

    if (!userExists) {
      return res.status(404).send("Email not found");
    }
    if (validatePass(userExists, password)) {
      req.logger.error("Can't use previous password");
      return res.status(400).send("Can't use previous password");
    }
    const result = await userService.updatePassword(email, password);

    return res.status(200).send("contraseña actualizada");
  } catch (error) {
    console.log(error)
    // logger.error(error);
    return error;
  }
};


export default nodemailer;