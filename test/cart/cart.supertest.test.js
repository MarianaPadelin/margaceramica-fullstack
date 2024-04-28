//getCarts, getCartbyId, postCart(pero automaticamente viendo al usuario creado?)
import config from "../../src/config/config.js";
import supertest from "supertest";
import { expect } from "chai";

const requester = supertest(config.rootUrl);

describe("Testing products api", () => {
  before(async function () {
    this.cookie;

    this.testUser = {
      first_name: "testCart",
      last_name: "testCart",
      email: "testCart@gmail.com",
      age: 30,
      password: "123",
    };

    //registrar usuario para pruebas
    await requester.post("/api/jwt/register").send(this.testUser);

    this.cartID;
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

  it("Traer todos los carritos de la API", async function () {
    //test
    const result = await requester
      .get("/api/carts")
      .set("Cookie", [`${this.cookie.name} = ${this.cookie.value}`]);

    //assert
    expect(result.statusCode).is.eqls(200);
    expect(Array.isArray(result._body.data)).to.be.ok;
  });

  it("Crear un carrito en la DB", async function () {
    //given
    const testCart = {
      products: [],
    };
    //test
    const { statusCode, _body } = await requester
      .post(`/api/carts/`)
      .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`])
      .send(testCart);

    this.cartID = _body.data._id;
    //assert
    expect(statusCode).is.eqls(200);
    expect(_body).to.be.not.empty;
    expect(_body.data._id).to.be.ok;
  });

  it("Vaciar carrito", async function () {
    //then
    const { _body, statusCode } = await requester
      .delete(`/api/carts/${this.cartID}`)
      .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`]);

    expect(statusCode).is.eqls(200);
    expect(_body.cart.products).to.be.empty;
  });
});

// npx mocha test/cart/cart.supertest.test.js
