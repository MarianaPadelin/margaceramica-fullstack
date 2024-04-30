import { cartService } from "../../Services/services.js";

export const registerUser = async (req, res) => {
  res.render("register", {
    fileCss: "register.css",
  });
};

export const getUsers = async (req, res) => {
  res.render("profile", {
    id: req.user._id,
    role: req.user.role,
    user: req.user.name,
    age: req.user.age,
    email: req.user.email,
    cart: req.user.cart,
  });
};

// export const getProducts = async (req, res) => {
//   try {
//     const { limit, page, category, stock } = req.query;
//     const products = await productService.filter(limit, page, category, stock);
//     res.render("products", {
//       products,
//       id: req.user._id,
//       role: req.user.role,
//       user: req.user.name,
//       age: req.user.age,
//       email: req.user.email,
//       cart: req.user.cart,
//       fileCss: "index.css",
//     });
//   } catch (error) {
//     req.logger.error(error.cause);
//     return res.status(500).send({ error: error.code, message: error.message });
//   }
  
// };


export const restoreForm = async (req, res) => {
  res.render("newPasswordForm", {});
};

// export const viewCart = async (req, res) => {
//     try {
//       const { cid } = req.params;

//       const cart = await cartService.getById(cid);

//       let products = cart.products;
//       req.logger.info(`Cart ID: ${cid}`);
//       res.status(200).send(cart)

//     } catch (error) {
//       req.logger.error(error.cause);
//       return res
//         .status(500)
//         .send({ error: error.code, message: error.message });
//     }
// }
