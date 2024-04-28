export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getAll = async () => {
    return await this.dao.findCart();
  };
  getById = (cid) => { 
    return this.dao.findCartById(cid);
  };
  save = (cart) => {
    return this.dao.createCart(cart);
  };
  addProduct = (cid, pid, cantidad) => {
    return this.dao.addProductToCart(cid, pid, cantidad);
  };
  update = (cid, cart) => {
    return this.dao.updateCart(cid, cart);
  };
  updateProduct = (cid, pid, quantity) => {
    return this.dao.updateOneProduct(cid, pid, quantity);
  };
  clear = (cid) => {
    return this.dao.clearCart(cid);
  };
  deleteProduct = (cid, pid) =>{
    return this.dao.deleteOneProduct(cid, pid);
  };
  getTotal = (cart) => {
    return this.dao.getTotal(cart);
  }
}


// export default new CartRepository();
