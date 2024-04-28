import { cartModel } from "../../Models/cart.model.js";
import mongoose from "mongoose";
import __dirname from "../../../dirname.js";
import logger from "../../../utils/loggers.js";

export default class CartDao {
  async findCart() {
    return await cartModel.find();
  }

  async findCartById(_id) {
    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        let result = await cartModel.findById(_id).populate("products._id");
        return result;
      }
      return { error: "Id format not valid" };
    } catch (error) {
      return error;
    }
  }

  async createCart(cart) {
    try {
      const newCart = await cartModel.create(cart);
      return newCart;
    } catch (error) {
      return error;
    }
  }

  async addProductToCart(_id, _pid, cantidad) {
    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        const cartFound = await cartModel.findById({ _id });

        const productoRepetido = cartFound.products.find(
          (producto) => producto._id == _pid
        );

        if (productoRepetido) {
          productoRepetido.quantity = productoRepetido.quantity + cantidad;
          await cartModel.findByIdAndUpdate({ _id: cartFound._id }, cartFound);

          const result = await cartModel.findById(_id).populate("products._id");

          return result;
        }
        let product = {_id:_pid, quantity: cantidad} 
        cartFound.products.push(product);
        // cartFound.products.push(_pid)

        await cartModel.findByIdAndUpdate({ _id: cartFound._id }, cartFound);

        const result = await cartModel.findById(_id).populate("products._id");

        return result;
      }
      return { error: "Id format not valid" };
      return;
    } catch (error) {
      return error;
    }
  }

  async updateCart(_id, cart) {
    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        const cartFound = await cartModel.findById({ _id });

        return await cartModel.findByIdAndUpdate({ _id }, cart);
      }
      return { error: "Id format not valid" };
    } catch (error) {
      return error;
    }
  }

  async updateOneProduct(_id, _pid, quantity) {
    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        const cartFound = await cartModel.findById({ _id });

        const productoBuscado = cartFound.products.find(
          (producto) => producto._id == _pid
        );

        if (productoBuscado) {
          productoBuscado.quantity = quantity;
          await cartModel.findByIdAndUpdate({ _id: cartFound._id }, cartFound);

          const result = await cartModel.findById(_id).populate("products._id");

          return result;
        }

        return;
      }
      return { error: "Id format not valid" };
    } catch (error) {
      return error;
    }
  }

  async clearCart(_id) {
    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        const cartFound = await cartModel.findById({ _id });
        cartFound.products = [];

        return await cartModel.findByIdAndUpdate({ _id }, cartFound);
      }
      return { error: "Id format not valid" };
    } catch (error) {
      return error;
    }
  }

  async deleteOneProduct(_id, _pid) {
    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        const cartFound = await cartModel.findById({ _id });

        const productoBuscado = cartFound.products.find(
          (producto) => producto._id == _pid
        );

        if (productoBuscado) {
          productoBuscado.deleteOne();
          await cartModel.findByIdAndUpdate({ _id: cartFound._id }, cartFound);

          const result = await cartModel.findById(_id).populate("products._id");

          return result;
        }
        logger.error("Product doesn't exist");
        return;
      }
      logger.error("Id format not valid");
    } catch (error) {
      return error;
    }
  }

  async getTotal(cart) {
    const cartFound = await this.findCartById(cart._id);

    const total = await cartFound.products.reduce((acc, elemento) => {
      return acc + elemento.quantity * elemento._id.price;
    }, 0);

    return total;
  }
}

// export default new CartDao();
