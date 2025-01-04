import MessagesDao from "../../Services/DAOS/mongoDB/messages.dao.js";
import { productService } from "../../Services/services.js";

export const home = (req, res) => {
  res.json("Servidor conectado");
};

export const getChat = async (req, res) => {
  const message = req.body;
  const user = req.body;

  const messages = await MessagesDao.addMessage(message);

  res.render("chat", {
    messages,
  });
};

//función que sólo renderiza los productos en handlebars
export const getProducts = async (req, res) => {
  try {
    const { limit, page, category, stock } = req.query;
    const products = await productService.filter(limit, page, category, stock);
    res.render("products", {
      products,
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
 const usuario = req.user
 res.send(usuario)
}
