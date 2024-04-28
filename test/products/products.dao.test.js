// import mongoose from "mongoose";
// import ProductDao from "../../src/Services/DAOS/mongoDB/product.dao.js";
// import chai from "chai";

// // npx mocha test/products.dao.test.js
// //crear una DB distinta para los tests
// mongoose.connect("mongodb://127.0.0.1:27017/test");

// const expect = chai.expect;

// // Escenario 1:
// describe("Testing product Dao", () => {
//   //instancio la clase productDao:
//   before(function () {
//     this.productDao = new ProductDao();
//   });

//   //le doy un tiempo para que la DB cree la data, cada vez que se ejecuta un it:
//   //   beforeEach(function() {
//   //     this.timeOut(5000)
//   //   })

//   it("el dao debe devolver los productos en forma de array", async function () {
//     //given
//     console.log(this.productDao);
//     const isArray = [];

//     //then
//     const result = await this.productDao.getAllproducts();
//     console.log(result);

//     //assert that
//     expect(Array.isArray(result)).to.be.ok;
//     expect(result.length).to.be.deep.equal(isArray.length);
//   });
//   //   it("TEST 02");
//   it("El dao debe agregar el producto correctamente a la DB", async function () {
//     // Given
//     let testProduct = {
//       title: "Producto de prueba 01",
//       description: "Esto es un producto de prueba",
//       price: 500,
//       code: "abc123",
//       category: "test",
//       stock: 10,
//     };

//     // Then
//     const result = await this.productDao.addProduct(testProduct);
//     // console.log(result);

//     // Assert that
//     expect(result._id).to.be.ok;
//   });

//   afterEach(function () {
//     //borro el usuario que agregué, para que no se repita el usuario agregado al hacer nuevos tests
//     mongoose.connection.collections.products.drop();
//   });

//   //   it("getProductById(_id)"";
//   //   it("getProductByCode(code)");
//   // it("modifyProduct(_id, newProduct)")
//   //it(deleteProduct(_id))
// });
