import config from "../../src/config/config.js";
import supertest from "supertest";
import { expect } from "chai";

const requester = supertest(config.rootUrl);

describe("Testing products api", () => {
  before(async function () {
    this.cookie;

    this.testUser = {
      first_name: "testProducts",
      last_name: "testProducts",
      email: config.adminMail,
      age: 30,
      password: config.adminPass,
    };

    //registrar usuario para pruebas
    await requester.post("/api/jwt/register").send(this.testUser);

    this.productID;

    const loginTest = {
      email: this.testUser.email,
      password: this.testUser.password,
    };

    //then
    const userLogin = await requester.post("/api/jwt/login").send(loginTest);

    const cookieResult = userLogin.headers["set-cookie"][0];

    //extraemos la cookie para guardarla en la variable global this.cookie
    const cookieData = cookieResult.split("=");
    this.cookie = {
      name: cookieData[0],
      value: cookieData[1],
    };
  });

  it("Traer todos los productos de la API", async function () {
    const result = await requester
      .get("/api/products")
      .set("Cookie", [`${this.cookie.name} = ${this.cookie.value}`]);

    //assert
    expect(result.statusCode).is.eqls(200);
  });

  it("Crear producto, el API POST /api/products debe generar un nuevo producto en la DB", async function () {
    //given

    const testProduct = {
      title: "Producto de prueba 01",
      description: "Esto es un producto de prueba",
      price: 500,
      code: "abc123",
      category: "test",
      stock: 10,
    };

    //then

    //seteamos la cookie para dar autorización a la ruta

    const { statusCode, _body } = await requester
      .post("/api/products")
      .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`])
      .send(testProduct);

    this.productID = _body.product._id;
    //assert
    expect(statusCode).is.eqls(201);
  });

  it("Crear producto sin un campo, debe retornar un status 400 con error.", async function () {
    //given
    const testProduct = {
      //   title: "Producto de prueba 01",
      description: "Esto es un producto de prueba",
      price: 500,
      code: "def456",
      category: "test",
      stock: 10,
    };

    //then

    const { statusCode, ok, _body } = await requester
      .post("/api/products")
      .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`])
      .send(testProduct);

    //assert
    expect(_body).is.ok.and.to.have.property("error");
  });

  it("Obtener un único producto por ID", async function () {
    //then
    const { statusCode, _body } = await requester
      .get(`/api/products/${this.productID}`)
      .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`]);

    //assert
    expect(statusCode).is.eqls(201);
    expect(_body.product._id).is.eqls(this.productID);
  });
  it("Modificar campos de un producto", async function () {
    //given
    const testProduct = {
      title: "Producto de prueba 01",
      description: "Estoy modificando un campo del producto de prueba",
      price: 500,
      code: "abc123",
      category: "test",
      stock: 10,
    };

    //then
    const { statusCode, _body } = await requester
      .put(`/api/products/${this.productID}`)
      .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`])
      .send(testProduct);

    //assert
    expect(statusCode).is.eqls(201);
    expect(_body.product.code).is.eqls(testProduct.code);
    expect(_body.product.description).is.not.eql(testProduct.description);
  });

  it("Eliminar un producto", async function () {
    //given
    //then
    const { statusCode } = await requester
      .delete(`/api/products/${this.productID}`)
      .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`]);

    //assert
    expect(statusCode).is.eqls(201);

    const result = await requester.get(`/api/products/${this.productID}`);
    expect(result.ok).is.eqls(false);
  });
});

// npx mocha test/products/products.supertest.test.js
