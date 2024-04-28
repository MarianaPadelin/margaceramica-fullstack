import CartDao from "./DAOS/mongoDB/cart.dao.js";
import ProductDao from "./DAOS/mongoDB/product.dao.js";
import TicketDao from "./DAOS/mongoDB/ticket.dao.js";
import UserDao from "./DAOS/mongoDB/user.dao.js";

import CartRepository from "./Repository/cart.repository.js";
import ProductsRepository from "./Repository/products.repository.js";
import TicketRepository from "./Repository/ticket.repository.js";
import userRepository from "./Repository/user.repository.js";

// Generamos las instancias de las clases
const productDao = new ProductDao()
const cartDao = new CartDao()
const ticketDao = new TicketDao()
const userDao = new UserDao()

export const productService = new ProductsRepository(productDao)
export const cartService = new CartRepository(cartDao);
export const ticketService = new TicketRepository(ticketDao);
export const userService = new userRepository(userDao)
