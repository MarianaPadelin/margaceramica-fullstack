export default class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getAll = () => {
    return this.dao.getAllProducts();
  };
  getById = (id) => {
    return this.dao.getProductById(id);
  };
  getByCode = (code) => {
    return this.dao.getProductByCode(code);
  };
  filter = (limit, page, category, stock, email) => {
    return this.dao.filterProducts(limit, page, category, stock, email);
  };
  save = (product) => {
    return this.dao.addProduct(product);
  };
  update = (id, product) => {
    return this.dao.modifyProduct(id, product);
  };
  delete = (id) => {
    return this.dao.deleteProduct(id);
  };
}

// export default new ProductsRepository();
