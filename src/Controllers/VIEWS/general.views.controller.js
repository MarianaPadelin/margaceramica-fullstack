import MessagesDao from "../../Services/DAOS/mongoDB/messages.dao.js";
import { productService } from "../../Services/services.js";

export const home = (req, res) => {
  res.render("home", {});
};

export const getChat = async (req, res) => {
  const message = req.body;
  const user = req.body;

  const messages = await MessagesDao.addMessage(message);

  res.render("chat", {
    messages,
  });
};

export const getProducts = async (req, res) => {
  try {
    const { limit, page, category, stock } = req.query;
    const products = await productService.filter(limit, page, category, stock);
    res.render("products", {
      products,
      // id: req.user._id,
      // role: req.user.role,
      // user: req.user.name,
      // age: req.user.age,
      // email: req.user.email,
      // cart: req.user.cart,
      fileCss: "index.css",
    });
  } catch (error) {
    req.logger.error(error.cause);
    return res.status(500).send({ error: error.code, message: error.message });
  }
};



export const resetView = async (req, res) => {
  res.render("resetPassword", {})
}

export const frontEndUser = async (req,res) =>{

//  req.logger.debug("llego a la funcion test")
 const usuario = req.user
//  console.log("funcion test usuario: ")
//  console.log(usuario)
 res.send(usuario)
}
