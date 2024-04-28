//ver donde hay un repository 
// import ProductsRepository from "../../Services/Repository/products.repository.js";
import CustomError from "../../Services/errors/customError.js";
import EErrors from "../../Services/errors/error-dictionary.js";
import {
  generateProductErrorInfoES,
  repetedCodeErrorInfo,
} from "../../Services/errors/messages/productSave.msg.js";
import { productService } from "../../Services/services.js";
import { sendProductDeletedEmail } from "../../utils/nodemailer.js";

//PARA PÚBLICO EN GENERAL (sin mostrar datos de cuenta)
export const getProducts = async (req, res) => {
  const { limit, page, category, stock } = req.query;
    // console.log(req.query)
    
  try {
    const products = await productService.filter(limit, page, category, stock);
      res.status(200).json(products)
    // res.status(200).render("productsLibre", {
    //   products,
    //   // fileCss: "index.css",
    // });
  } catch (error) {
    req.logger.error(error.cause);
    return res.status(500).send({ error: error.code, message: error.message });
  }
};

//PARA ADMIN (sin carrito):
// export const getAdminProducts = async (req, res) => {
//   const { limit, page, category, stock } = req.query;
//   try {
//     const products = await productService.filter(limit, page, category, stock);

//     res.status(200).render("productsAdmin", {
//       user: req.user.name,
//       role: req.user.role,
//       products,
//       fileCss: "index.css",
//     });
//   } catch (error) {
//     req.logger.error(error.cause);
//     return res.status(500).send({ error: error.code, message: error.message });
//   }
// };

//PARA PREMIUM (vista de edicion con solamente sus productos):
export const getOwnerProducts = async (req, res) => {
  const { limit, page, category, stock } = req.query;

  req.logger.info(req.user.email);


  try {
    const products = await productService.filter(
      limit,
      page,
      category,
      stock,
      req.user.email
    );
      res.status(200).send({
          products,
      });
    // res.status(200).render("productsAdmin", {
    //   user: req.user.name,
    //   role: req.user.role,
    //   products,
    //   fileCss: "index.css",
    // });
  } catch (error) {
    req.logger.error(error.cause);
    return res.status(500).send({ error: error.code, message: error.message });
  }
};

//PARA USERS:
// export const getUserProducts = async (req, res) => {
//   const { limit, page, category, stock } = req.query;
//   // console.log(req.query)
//   try {
//     const products = await productService.filter(limit, page, category, stock);

//     res.status(200).render("products", {
//       id: req.user._id,
//       user: req.user.name,
//       role: req.user.role,
//       cart: req.user.cart,
//       products,
//       fileCss: "index.css",
//     });
//   } catch (error) {
//     req.logger.error(error.cause);
//     return res.status(500).send({ error: error.code, message: error.message });
//   }
// };

export const getOneProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await productService.getById(pid);
    //hacer render con vista del producto individual
    res.status(201).json({
      product,
    });
  } catch (error) {
    req.logger.error(error.cause);
    return res.status(500).send({ error: error.code, message: error.message });
  }
};

export const postProduct = async (req, res) => {
  try {
    const { title, description, price, code, category, stock, thumbnails } =
      req.body;
    const owner = req.user.email;

    const datosProducto = {
      title,
      description,
      price,
      code,
      category,
      stock,
      thumbnails,
      owner,
    };

    req.logger.info(`producto ingresado: ${datosProducto}`);
    // console.log(datosProducto)

    if (!title || !description || !price || !code || !category || !stock) {
      CustomError.createError({
        name: "Error de ingreso de datos",
        cause: generateProductErrorInfoES(datosProducto),
        message: "Error ingresando los datos del producto.",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }
    const codeExists = await productService.getByCode(code);
    if (codeExists) {
      CustomError.createError({
        name: "El código ya existe",
        message: "El código debe ser único",
        cause: repetedCodeErrorInfo(code),
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }

    const product = await productService.save(datosProducto);
    if(req.user.role === "premium"){
        return  res.status(200).json({
            product,
          });
    }
    return res.status(201).json({
      product,
    });
  } catch (error) {
    req.logger.error(error.cause);
    return res.status(500).send({ error: error.code, message: error.message });
  }
};

export const changeProduct = async (req, res) => {
  const { pid } = req.params;
  const datosProducto = req.body;

  try {
    req.logger.info(pid, datosProducto);

    const product = await productService.getById(pid);

    if (product.owner === req.user.email || req.user.role === "admin") {
      productService.update(pid, datosProducto);
      if(req.user.role === "admin") {
        return res.status(201).json({
          product,
        });
      }
      if (req.user.role === "premium") {
        return res.status(200).json({
          product,
        });
      }
      
    } else {
      return res
        .status(401)
        .send("No puede editar productos que no son propios");
    }
  } catch (error) {
    req.logger.error(error.cause);
    return res.status(500).send({
      messsage: `Error updating product ${pid}`,
      error: error,
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  const email = req.user.email
  try {
    const product = await productService.getById(pid);
    if (!product) {
      res.status(404).json({
        message: "Product not found",
      });
    }
    if (product.owner === email || req.user.role === "admin") {

      productService.delete(pid);
      req.logger.info(`Product ${pid} deleted`);
       if (req.user.role === "admin") {
         return res.status(201).send({
           message: "Product deleted",
           product,
         });
       }
       if (req.user.role === "premium") {
        let productTitle = product.title
        sendProductDeletedEmail(email, productTitle)
         return res
           .status(200)
           .send({
             message: "Product deleted",
             product,
           })
  
       }
     
    } else {
      return res
        .status(401)
        .send("No puede eliminar productos que no son propios");
    }
  } catch (error) {
    req.logger.error(error.cause);
    return res.status(500).send({
      messsage: "Error deleting products",
      error: error,
    });
  }
};
